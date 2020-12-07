import { Component, OnInit, HostListener,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ApiDataService } from '../../../providers/api-data.service';
import { UserDataService } from '../../../providers/user-data.service';
import { MessageService } from '../../../providers/websocket.service';
import { AppConfig } from '../../../providers/APP_CONFIG';
import { Chats, ChatItem, Agents, GetChatParams } from '../../../interfaces/user-options';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  searchTerm:any = '';
  conversationParams: any = '';
  chatOptions: any= '';
  conversation: any;
  chats = [];
  tempChats = [];
  chatId: string;
  agents = [];
  segment = 'active';
  displayMessage: any;
  displayText: any;
  newMsgCount: number = 0;
  newChatCount: number = 0;
  invitedChatCount: number = 0;
  transferredChatCount: number = 0;
  liveChats: number = 0;
  previousSelected:number;
  selectedIndex: number;
  windowHeight: number;
  windowWidth: number;
  getChatParams: GetChatParams = { startDate: '', endDate: '', type: this.segment };
  toastSubscription: Subscription;
  toast: any;
  showToast: boolean;
  showLoader: boolean;
  WAIT_MSG = 'Please wait...Syncing Chats-';
  NETWORK_ONLINE_MSG = 'online';
  NETWORK_OFFLINE_MSG = 'offline';
  NETWORK_MSG = 'Chat list not Synced,Please Turn On Internet!';
  NO_CHATS = 'No Available Chats';
  NETWORK_OFFLINE = 'none';
  CHAT_ERROR = 'error in fetching chatlist';
  NO_NEW_CHATS = 'No New Chats to Accept!';
  NO_TRANSFERRED_CHATS = 'No Transferred Chats to Accept!';
  NO_INVITED_CHATS = 'No Invited Chats to Accept!';
  contentHeight:any;
  contentWidth:any;
  constructor(
  private apiData : ApiDataService,
  private userData : UserDataService,
  private messageService : MessageService,
  private route : ActivatedRoute) { }

  ngOnInit() {
      this.apiData.authToken =  this.getParameter("authToken");
      this.apiData.getUserId().subscribe(
      result => {
        if(result.login_required){
          this.userData.navigate('/error');
        } else {
        this.userData.user = result.response.uId;
        this.load();
        }
      },
      error => console.log('HTTP getProfile Error', error));
  }

  getParameter(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  load(){
    this.showLoader =  true; 
    this.subscribeToast();
    if(navigator.onLine === true) {
      this.getChats();
      if (!this.messageService.connectionStatus) {
        this.messageService.connect(false);
      }
      this.subscribeConversation();
    } else {
      this.displayText = this.NETWORK_MSG;
      this.displayMessage = true;
      this.userData.showToast('error',this.NETWORK_MSG);
    }
  }

  removeTimer(timer: any) {
    clearTimeout(timer);
  }

  @HostListener('window:online')
  chatOnline() {
   this.userData.showToast('success','Network is Back!');
  }

  @HostListener('window:offline')
  chatOffline() {
   this.userData.showToast('error','Network is offline,Please Turn On Internet!');
  }

  subscribeToast() {
    this.toastSubscription = this.userData.getSubscription().subscribe(toast => {
      this.toast = toast;
      this.showToast = true;
      let loader = setTimeout(() => {
        this.showToast = false;
        this.removeTimer(loader);
      }, 8000);
    });
  }

  removeToast() {
    this.showToast = false;
    this.toast = null;
  }

  subscribeConversation() {
    this.messageService.chatSubscription = this.messageService.getSubscription().subscribe(message => {
      switch (message.action) {
        case 'customerStartChat':
          this.newChatCount += 1;
          this.liveChats += 1;
          break;
        case 'agentPickupChat':
          var content = message.content[0];
          var socketChat = content.response.chat;
          if (content.message.message === 'Agent picked up the chat') {
            socketChat.newMsgCount = socketChat.messages.length;
            socketChat.messageCount = socketChat.messages.length;
            if (this.chats.length > 0) {
              this.chats.unshift(socketChat);
            }
            else {
              this.chats.push(socketChat);
              this.displayMessage = false;
            }
            this.liveChats -= 1;
            this.newMsgCount += socketChat.messages.length;
          }
          break;
        case 'waitingInviteAccept':
          this.invitedChatCount += 1;
          this.liveChats += 1;
          break;
        case 'youAcceptedInvite':
          var content = message.content[0];
          var socketChat = content.response.chat;
          socketChat.newMsgCount = socketChat.messages.length;
          socketChat.messageCount = socketChat.messages.length;
          if (this.chats.length > 0) {
            this.chats.unshift(socketChat);
          }
          else {
            this.chats.push(socketChat);
            this.displayMessage = false;
          }
          this.liveChats -= 1;
          this.newMsgCount += socketChat.messages.length;
          break;
        case 'waitingTransferAccept':
          this.transferredChatCount += 1;
          this.liveChats += 1;
          break;
        case 'youAcceptedTransfer':
          var content = message.content[0];
          var socketChat = content.response.chat;
          socketChat.newMsgCount = socketChat.messages.length;
          socketChat.messageCount = socketChat.messages.length;
          if (this.chats.length > 0) {
            this.chats.unshift(socketChat);
          }
          else {
            this.chats.push(socketChat);
            this.displayMessage = false;
          }
          this.liveChats -= 1;
          this.newMsgCount += socketChat.messages.length;
          break;
        case 'customerReplyChat':
          this.messageUpdate(message);
          break;
        case 'agentReplyChat':
          this.messageUpdate(message);
          break;
        case 'inviteAgent':
          this.messageUpdate(message);
          break;
        case 'acceptInvite':
          this.liveChats -= 1;
          this.messageUpdate(message);
          break;
        case 'inviteAgentFailed':
          this.userData.showToast('error',message.content[0].message.message);
          break;
        case 'agentLeave':
          this.messageUpdate(message);
          break;
        case 'youTransferredToAgent':
          this.chats.map((chat, index) => {
            if (chat.chatId === message.content[0].response.chat.chatId) {
              this.conversationParams = '';
              this.chats.splice(index, 1);
            }
          });
          this.userData.showToast('success','You transferred the chat!');
          break;
        case 'youLeft':
          this.chats.map((chat, index) => {
            if (chat.chatId === message.content[0].response.chat.chatId) {
              this.conversationParams = '';
              this.chats.splice(index, 1);
            }
          });
          this.userData.showToast('success','You left the chat!');
          break;
        case 'transferToAgentFailed':
          this.userData.showToast('error',message.content[0].message.message);
          break;
        case 'agentCloseChat':
          this.chats = [];
          this.newMsgCount = 0;
          this.getChats();
          break;
        case 'agentPickupChatFailed':
          this.userData.showToast(message.content[0].message.message);
          this.liveChats -= 1;
          this.newChatCount -= 1;
          break;
        case 'noChatPicked':
          this.userData.showToast(message.content[0].message.message);
          this.liveChats -= 1;
          this.newChatCount -= 1;
          break;
        case 'chatMissedNotify':
          break;
        case 'chatMessageStatus':
          this.chats.map((chat, index) => {
            if (chat.chatId === message.content[0].chat.chatId) {
              chat.messages[chat.messages.length - 1].status = message.content[0].chat.messages[0].status;
            }
          });
          break;
        case 'chatTyping':
          if(this.selectedIndex !== undefined){
            this.chats[this.selectedIndex].typing = message.content[0];
            window.dispatchEvent(new CustomEvent('chat:typing'));
          }
          break;
        case 'onOpen': {
          var content = message.content[0];
          if(content.response && content.response.enterprise){
            var enterprise = content.response.enterprise;
            this.newChatCount = enterprise.unPickedCount;
            this.transferredChatCount = enterprise.transferredCount;
            this.invitedChatCount = enterprise.invitedCount;
          }
          break;
        }
        default: 'socket'
          console.log('socket message from chat', message);
       }
    });
  }

  getChats() {
    if (navigator.onLine === true) {
      if (this.segment === AppConfig.ENV.CHATS.ACTIVECHATS) {
        this.apiData.getActiveChat().subscribe(
          result => {
            this.processChats(result)
          },
          error => {
             console.log('HTTP activeChats Error', error)
             this.showLoader =  false;
          });
      }
      else {
        this.apiData.getClosedChat(this.getChatParams).subscribe(
          result => {
            this.processChats(result)
          },
          error => {
             console.log('HTTP closedChats Error', error)
             this.showLoader =  false;
          });
        }
      }
    else {
      this.displayText = this.NETWORK_MSG;
      this.displayMessage = true;
      this.userData.showToast('error',this.NETWORK_MSG);
    }
  }

  processChats(parsedResult: any) {
    if (parsedResult.status === true) {
      if (parsedResult.response.chats.length > 0) {
        this.userData.getChatList(parsedResult.response.chats).then((chatList) => {
          this.chats = chatList;
          console.log('chats :',this.chats);
          this.tempChats = chatList;
          this.displayMessage = false;
        });
      }
      else {
        this.displayText = this.NO_CHATS;
        this.displayMessage = true;
      }
      this.getAgents();
      this.showLoader =  false;
    }
    else {
      this.showLoader =  false;
      this.userData.showToast(parsedResult.message);
    }
  }

  switchSegment(segment: string) {
    this.showLoader = true;
    if(this.conversationParams != ''){
      this.conversationParams = '';
      this.chatOptions = '';
    }
    this.selectedIndex = undefined;
    this.previousSelected = undefined;
    this.chats = [];
    this.segment = segment;
    this.getChatParams.type = segment;
    this.getChatParams.startDate = this.getStartDate();
    this.getChatParams.endDate = this.getEndDate();
    this.getChats();
  }

  messageUpdate(socketMessage: any) {
    var msg = socketMessage.content[0].response.chat;
    this.chats.forEach((chat, index) => {
      if (msg.messages[0].actionBy === this.userData.user) {
        msg.messages[0].status = 1;
      }
      if (chat.chatId == msg.chatId) {
        msg.messages[0].actedDateTime = { "$date": new Date(msg.messages[0].actedOn).getTime() }
        chat.messages.push(msg.messages[0]);
        if (msg.messages[0].actionBy != this.userData.user && this.chatId != msg.chatId) {
          chat.newMsgCount += 1;
          this.newMsgCount += 1;
        }
        window.dispatchEvent(new CustomEvent('chat:message'));
      }
    });
    return this.newMsgCount;
  }

  getAgents() {
    this.apiData.getAgents().subscribe(
      result => {
        this.agents = result.response.users;
      },
      error =>{
        console.log('HTTP getAgents Error', error);
      });
  }

  getStartDate() {
    var date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    var startDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return startDate.replace("Z", "");
  }

  getEndDate() {
    var date = new Date();
    var endDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return endDate.replace("Z", "");
  }

  getDate(i: any) {
    return new Date(this.chats[i].messages[this.chats[i].messages.length - 1].actedDateTime.$date).toString().substring(4, 15);
  }

  getTime(i: any) {
    return new Date(this.chats[i].messages[this.chats[i].messages.length - 1].actedDateTime.$date).toString().substring(16, 21);
  }

  checkDate(i: any) {
    if (this.getDate(i) == new Date().toString().substring(4, 15)) {
      return this.getTime(i);
    }
    else {
      return this.getDate(i);
    }
  }

  openConversation(index: any) {
    this.previousSelected = this.selectedIndex;
    this.selectedIndex = index;
    this.chatId = this.chats[index].chatId;
    this.chats[index].newMsgCount = 0;
    this.conversationParams = {
      conversation: this.chats[index],
      agents: this.agents,
      chatType: this.segment
    }
    let notes = {
      note : this.chats[index].agentNote,
      tag : this.chats[index].tags,
    }
    let customerInfo = {
      id : this.chats[index].cId,
      name : this.chats[index].customerName,
      number : this.chats[index].customerNumber,
      chatId : this.chats[index].chatId
    }
    this.chatOptions = {
      notes: notes,
      customerInfo : customerInfo,
    }
  }

  getChatOptions(event: any){
    this.chats[this.selectedIndex].tags = event.tag;
    this.chats[this.selectedIndex].agentNote = event.note;
  }

  checkLiveChats(type: string) {
    if (type === 'new') {
      if (this.newChatCount > 0) {
        let params = {
          "action": "agentPickupChat", "chatId": ""
        }
        this.messageService.sendMessage(params);
        this.newChatCount -= 1;
      }
      else {
        this.userData.showToast('success',this.NO_NEW_CHATS);
      }
    }
    else if (type === 'transferred') {
      if (this.transferredChatCount > 0) {
        let params = {
          "action": "acceptTransfer", "chatId": ""
        }
        this.messageService.sendMessage(params);
        this.transferredChatCount -= 1;
      }
      else {
        this.userData.showToast('success',this.NO_TRANSFERRED_CHATS);
      }
    }
    else {
      if (this.invitedChatCount > 0) {
        let params = {
          "action": "acceptInvite", "chatId": ""
        }
        this.messageService.sendMessage(params);
        this.invitedChatCount -= 1;
      }
      else {
        this.userData.showToast('success',this.NO_INVITED_CHATS);
      }
    }
  }
  trackById(index: number, chat: ChatItem) {
    return chat.messages[chat.messages.length - 1].actionId;
  }

  // searchChat() {
  //   setTimeout(() => {
  //     this.chats = this.tempChats
  //     this.loader();
  //     this.searchTerm = this.searchTerm.replace(/(-|\s+|\/)/g, '');
  //     if (this.searchTerm && this.searchTerm.trim() != '') {
  //       console.log('from chat search',this.searchTerm)
  //       let result: any = [];
  //       let i = 0;
  //       this.chats.filter((chat: any) => {
  //           i += 1;
  //           console.log('filtering', chat.contact_on, chat.contact_number, chat.id, i);
  //             if (chat.customerName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 || chat.lastMessage.toString().indexOf(this.searchTerm.toLowerCase()) !== -1 || chat.customerNumber.toString().indexOf(this.searchTerm.toLowerCase()) !== -1 || new Date(chat.messages[chat.messages.length - 1].actedDateTime.$date).toString().substring(4, 15).indexOf(this.searchTerm.toLowerCase()) !== -1) {
  //               result.push(chat);
  //               console.log(result);
  //             }
  //             if (i == this.chats.length) {
  //               if (result.length > 0) {
  //                 console.log("from if");
  //                 this.chats = result;
  //               } else {
  //                 console.log("from else");
  //                 this.chats = result;
  //                 this.displayText = 'No Results Found!';
  //                 this.displayMessage = true;
  //               }
  //             }
  //         });
  //   }
  //     else if (this.searchTerm === '') {
  //       this.chats = this.tempChats;
  //       this.displayMessage = false;
  //     }
  //   }, 1000);
  // }
}
