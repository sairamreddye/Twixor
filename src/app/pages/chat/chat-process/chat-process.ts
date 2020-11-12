import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataService } from '../../../providers/user-data.service';
import { ApiDataService } from '../../../providers/api-data.service';
import { MessageService } from '../../../providers/websocket.service';
import { Agents, Departments } from '../../../interfaces/user-options';
import { AppConfig } from '../../../providers/APP_CONFIG';
@Component({
  selector: 'app-chat-process',
  templateUrl: './chat-process.html',
  styleUrls: ['./chat-process.scss'],
})
export class ChatProcessComponent {
  platform : string;
  selectedAgent: number = 0;
  selectedDepartment:string = '';
  agents: Agents=[];
  departments: Departments=[];
  displayMessage: boolean;
  displayText: string;
  process: any;
  role: string;
  loading:any;
  selected:any;
  WAIT_MSG = 'Pls wait..Syncing list!';
  API_FETCH_ERROR = 'error in getting agents and departments';
  NETWORK_OFFLINE = 'none';
  NETWORK_OFFLINE_MSG = 'Agent and Department list not Synced,Please Turn On Internet!'
  TOAST_DURATION = 3000;
  WEBSOCKET_TRANSFER = 'transferToAgent';
  WEBSOCKET_INVITE = 'inviteAgent';
  EMPTY_SELECTION_TOAST = 'Please Select Role and Member!';
  CHAT_TRANSFER_TOAST = 'Chat has been Transferred!';
  INVITE_TOAST = 'Invite Request has been sent to Agent!';
  constructor(
    private apiData: ApiDataService,
    private userData: UserDataService,
    private messageService: MessageService, 
    public dialogRef: MatDialogRef<ChatProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.process = data.process;
    if(this.process.action === AppConfig.ENV.CHATS.INVITEAGENT){
      this.getAgents();
    }
  }

  getData(){
   if(this.role === 'agent'){
     this.getAgents();
   }
   else {
     this.getDepartments();
   }
  }

  getAgents() {
    if (navigator.onLine === true) {
      this.apiData.getAgents().subscribe(result => {
        this.processRole(result,'agents');
      },
      error => console.log('HTTP agents Error', error));
    }
    else {
      this.displayText = this.NETWORK_OFFLINE_MSG
      this.displayMessage = true;
      this.userData.showToast(this.NETWORK_OFFLINE_MSG);
    }
  }

  getDepartments(){
    if (navigator.onLine === true) {
      this.apiData.getDepartments().subscribe(result => {
        this.processRole(result,'departments');
        },
      error => console.log('HTTP departments Error', error));
    }
    else {
      this.displayText = this.NETWORK_OFFLINE_MSG
      this.displayMessage = true;
      this.userData.showToast(this.NETWORK_OFFLINE_MSG);
    }
  }

  processRole(parsedResult,role:string){
    if(parsedResult.status === true){
     if(role === 'agents'){
       this.agents = parsedResult.response.users;
       this.selectedAgent = this.agents[0].uId;
     }
     else {
       this.departments = parsedResult.response.profiles;
       this.selectedDepartment = this.departments[0]._id.$oid;
     }
    }
    else {
      this.userData.showToast(parsedResult.message);
    }
  }

  chatProcess() {
      if (this.process.action == AppConfig.ENV.CHATS.CHATTRANSFER) {
        if(this.role != undefined ){
        if (this.role == 'agent') {
          this.process.action = this.WEBSOCKET_TRANSFER;
          this.process.transferredTo = this.selectedAgent;
        }
        else {
          this.process.action = this.WEBSOCKET_TRANSFER;
          this.process.transferredDept = this.selectedDepartment;
        }
        this.messageService.sendMessage(this.process);
        this.userData.showToast(this.CHAT_TRANSFER_TOAST);
        this.dialogRef.close({ event: 'close', data: 'Transfer Chat' });
      }
      else {
        this.userData.showToast(this.EMPTY_SELECTION_TOAST)
      }
    }
      else if (this.process.action == AppConfig.ENV.CHATS.INVITEAGENT){
        this.process.action = this.WEBSOCKET_INVITE;
        this.process.invitedAgent = this.selectedAgent;
        this.messageService.sendMessage(this.process);
        this.userData.showToast(this.INVITE_TOAST);
        this.dialogRef.close();
    }
  }
   
  cancelChat(){
     let params = {
        action: "agentCloseChat",
        chatId: this.process.chatId,
      }
        if (this.process.action == 'leave') {
          params.action = 'agentLeave';
        }
        this.messageService.sendMessage(params);
        this.dialogRef.close({ event: 'close', data: 'deleted chat' });
  } 

  cancelProcess() {
    this.selectedAgent = 0;
    this.selectedDepartment = '';
    this.dialogRef.close();
  }

  goBack(){
    this.dialogRef.close();
  }
}
