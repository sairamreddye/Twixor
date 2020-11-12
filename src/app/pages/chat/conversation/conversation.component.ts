import { Component, OnInit,OnDestroy,AfterViewChecked,Input,ElementRef,ViewChild,HostListener } from '@angular/core';
import { Conversation,Agents,Messages,Message, Preview } from '../../../interfaces/user-options';
import { UserDataService } from '../../../providers/user-data.service';
import { MessageService } from '../../../providers/websocket.service';
import { AttachmentComponent } from '../attachment/attachment.component';
import { ChatProcessComponent } from '../chat-process/chat-process';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @ViewChild('scroll',{ static : false }) private scrollContent: ElementRef;
  private _conversationParams:any = '';
  conversation:Conversation;
  messages: Messages;
  message: string = '';
  customerName: string = '';
  chatId: string;
  agentId: number;
  agents:Agents;
  chatType:any = '';
  senderTyping: boolean = false;
  typing: boolean = false;
  displayMessage: boolean = true;
  displayText: string;
  previewAttachment: boolean = false;
  previewData: Preview = [{ "data": { "type": "TEXT" }}];
  user: any;
  subscription: Subscription;
  showLoader: boolean;
  NO_CONVERSATION = 'No Available Conversation!';
  WAIT_MSG = 'Please wait...Syncing Conversation';
  CHAT_AGENT = 'Chat Agent-';
  NETWORK_OFFLINE = 'none';
  EMPTY_TOAST_MESSAGE = 'Please type a message before Clicking "Send"!';
  NETWORK_OFFLINE_MSG = 'Pls Turn On Your Internet!';
  DEFAULT_MESSAGE = 'Click Chat to Open Conversation!';
  
  @Input()
  set conversationParams(conversationParams:any){
    if(conversationParams){
    this.showLoader =  true; 
    this.previewAttachment = false;
    this.previewData = [{ "data": { "type": "TEXT" }}];
    this._conversationParams = conversationParams;
    this.conversation = this._conversationParams.conversation;
    if(this.chatId != this.conversation.chatId){
      this.senderTyping = false;
    }
    this.chatId = this.conversation.chatId;
    this.messages = this.conversation.messages;
    this.customerName = this.conversation.customerName;
    this.agents = this._conversationParams.agents;
    this.chatType = this._conversationParams.chatType;
    this.displayMessage = false;
    let scrollTimeout = setTimeout(() => {
     this.scrollToBottom();
     this.showLoader =  false; 
      this.removeTimer(setTimeout);
    }, 300);
    }
    else {
      this.chatType = '';
      this.displayMessage = true;
    }
  }

  constructor(private userData : UserDataService,
  private messageService : MessageService,
  private dialog :MatDialog
  ) { }

  ngOnInit() {
    this.displayText = this.DEFAULT_MESSAGE;
  }

  scrollToBottom(){
    this.scrollContent.nativeElement.scrollTop = Math.max(0, this.scrollContent.nativeElement.scrollHeight - this.scrollContent.nativeElement.offsetHeight);
  }
  
  removeTimer(timer: any) {
    clearTimeout(timer);
  }

  getAgentName(uId: number, actionType: any) {
    if (uId === this.userData.user) {
      if (actionType === 3) {
        return this.findAgent(uId);
      } else {
        return 'you';
      }
    } else {
      return this.findAgent(uId);
    }
  }

  findAgent(uId: number) {
    let agent = this.agents.filter(agent => agent.uId === uId)[0];
    if (agent) {
      return agent.name ? agent.name : agent.emailId;
    } else {
      return this.CHAT_AGENT + uId;
    }
  }
  
  pushFormat() {
    let attachment = {};
    if (this.previewData[0].data.type == 'TEXT') {
      attachment = {}
    } else {
      attachment = Object.assign({}, this.previewData[0].data);
    }

    if (this.previewData[0].data.type == 'MSG') {
      this.previewData[0].data.type = 'TEXT';
    }
    
    return {
      "actionType": 3,
      "action": "agentReplyChat",
      "actionBy": this.conversation.handlingAgent,
      "eId": this.conversation.eId,
      "message": this.message,
      "contentType": this.previewData[0].data.type,
      "attachment": attachment,
      "chatId": this.conversation.chatId,
      "pickup": false
    };
  }
  
  
  getTimeStamp() {
    var date = new Date();
    return date.getTime();
  }

  pushMessage() {
    this.messageService.sendMessage(this.pushFormat());
    this.conversation.messages[this.conversation.messages.length - 1].actionBy = this.conversation.handlingAgent,
    this.conversation.messages[this.conversation.messages.length - 1].actedDateTime = { "$date": this.getTimeStamp() };
    let scroll = setTimeout(() => {
        this.scrollToBottom();
        this.removeTimer(scroll);
      }, 600);
    this.message = '';
    this.previewData = [{ "data": { "type": "TEXT" }, }];
    this.previewAttachment = false;
  }

  async sendMessage() {
    if (navigator.onLine === true) {
      if (this.previewAttachment == true || this.message.replace(/(\r\n|\n|\r)/gm, "") != '') {
        if (this.previewAttachment == true && this.previewData[0].data.type == 'MSG') {
          this.message = this.previewData[0].data.desc;
        }
        this.pushMessage();
      } else {
        this.message = this.message.replace(/(\r\n|\n|\r)/gm, "");
        this.userData.showToast('error',this.EMPTY_TOAST_MESSAGE);
      }
    } else {
      this.userData.showToast('error',this.NETWORK_OFFLINE_MSG);
    }
  }

  isTyping() {
    if(this.typing == false) {
    let params = {
      "action": "chatTyping",
      "chatId": this.conversation.chatId,
      "eId": this.conversation.eId
    }
    this.typing = true;
    this.messageService.sendMessage(params);
    let userTyping = setTimeout(() => {
      this.typing = false;
      this.removeTimer(userTyping);
    }, 5000);
   }
  }
  
  @HostListener('window:chat:message')
  callScroll(){
    let scrollTimeout = setTimeout(() => {
     this.scrollToBottom();
      this.removeTimer(setTimeout);
    }, 600);
  }

  @HostListener('window:chat:typing')
  chatTyping() {
    if(this.conversation.typing.chatId === this.chatId){
      this.user = this.conversation.typing;
      this.senderTyping = true;
      this.scrollToBottom();
      let typeScroll = setTimeout(() => {
        this.senderTyping = false;
        this.removeTimer(typeScroll)
      }, 3000);
    }
  }

  checkAttachment(i: any) {
    if (this.messages[i].attachment) {
      return true
    }
    return false;
  }

  getDate(i: any) {
    return new Date(this.messages[i].actedDateTime.$date).toString().substring(4, 15);
  }

  getTime(i: any) {
    return new Date(this.messages[i].actedDateTime.$date).toString().substring(16, 21);
  }

  checkDate(i: any) {
    if (i == 0) {
      return this.getDate(i);
    } else if ((i > 0) && (this.getDate(i) != this.getDate(i - 1))) {
      return this.getDate(i);
    }
  }

  trackById(index: number, message: Message) {
    return message.actionId
  }
   
  previewMessage(selection: any) {
    this.previewData.splice(0);
    this.previewData.push(selection);
    switch (this.previewData[0].data.type) {
      case 'VIDEO':
        this.previewData[0].data.isVideo = true;
        break;
      case 'AUDIO':
        this.previewData[0].data.isAudio = true;
        break;
      case 'IMAGE':
        this.previewData[0].data.isImage = true;
        break;
      case 'DOC':
        this.previewData[0].data.isDocument = true;
        break;
      case 'MAP':
        this.previewData[0].data.isMap = true;
        break;
      case 'URL':
        this.previewData[0].data.isUrl = true;
        break;
      default:
    }
    this.previewAttachment = true;
  }

  cancelPreview() {
    this.previewAttachment = false;
    this.previewData = [{ "data": { "type": "TEXT" }, }];
  }

  openAttachment(type: string) {
    if (navigator.onLine === true) {
      const attachmentModal = this.dialog.open(AttachmentComponent, {
        width: '500px',
        height: '500px',
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass: 'custom-dialog-panel-class',
        data: { type: type }
      });

      attachmentModal.afterClosed().subscribe(result => {
        if(result){
          this.previewMessage(result.data)
        }
      });
    } else {
      this.userData.showToast('error',this.NETWORK_OFFLINE_MSG);
    }
  }

  chatProcess(process: string) {
      if (navigator.onLine === true) {
        let params = { 
        action: process,
        chatId: this.conversation.chatId 
      }
      let panelClass = 'chat-process-invite-dialog';
      if(process === 'Close' || process === 'Leave'){
         panelClass = 'chat-process-close-dialog';
      }
      else if(process === 'Transfer Chat'){
        panelClass = 'chat-process-transfer-dialog';
      }
      const chatProcess = this.dialog.open(ChatProcessComponent, {
        backdropClass: 'custom-dialog-backdrop-class',
        panelClass:panelClass,
        data: { process: params }
      });
      chatProcess.afterClosed().subscribe(result => {
        if(result && result.data === 'deleted chat'){
          this._conversationParams = '';
          this.conversation = undefined;
          this.messages = undefined;
          this.displayText = this.DEFAULT_MESSAGE;
          this.displayMessage = true;
        }
      });
    } else {
      this.userData.showToast('error',this.NETWORK_OFFLINE_MSG);
    }  
 }

  openImage(url:any){
    let params = { 
      action: 'Image',
      url: url
    }
    const image = this.dialog.open(ChatProcessComponent, {
      width: '400px',
      height: '400px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { process: params }
    });
  }
  
  getInvitedStatus(){
    if(this.conversation){
      if(this.conversation.handlingAgent != this.userData.user){
        return 'invited';
      } 
      else {
        return 'handling';
      }
    }
    else {
      return false;
    }
  }
  
}
