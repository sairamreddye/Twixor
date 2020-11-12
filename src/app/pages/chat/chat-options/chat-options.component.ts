import { Component,Input,Output,EventEmitter,OnInit } from '@angular/core';
import { Customer, Notes } from '../../../interfaces/user-options';
import { ApiDataService } from '../../../providers/api-data.service';
import { UserDataService } from '../../../providers/user-data.service';
@Component({
  selector: 'app-chat-options',
  templateUrl: './chat-options.component.html',
  styleUrls: ['./chat-options.component.scss']
})
export class ChatOptionsComponent implements OnInit{
  private _chatOptions:any = '';
  constructor(private apiData: ApiDataService,
  private userData: UserDataService
  ) { }
   customer: Customer = {
    id: undefined,
    name: '',
    number: '',
    chatId:''
  };
  notes: Notes = {
    tag: [],
    note: ''
  };
  tags:any;
  chatClicked : boolean = false;
  showLoader: boolean;
  TOAST_DURATION = 3000;
  UPDATE_TOAST_MSG = 'Tags and Notes updated!';
  ERROR_TOAST_MSG = 'error in updating tags and notes';
  EMPTY_CONVERSATION = 'Please Select Conversation before updating Tags and Notes!'
  EMPTY_TOAST_MESSAGE = 'Please Select Tags and Notes before Clicking "Update"!';
  NETWORK_OFFLINE = 'none';
  NETWORK_OFFLINE_MSG = 'Please Turn On Internet!';
  accordion:any;
  listener:boolean =false;

  @Output() saveNote = new EventEmitter();
  
  @Input() 
  set chatOptions(chatOptions:any) {
    if (chatOptions){
      this.showLoader =  true;
      this._chatOptions = chatOptions;
      this.customer = this._chatOptions.customerInfo;
      this.notes = this._chatOptions.notes;
      if(this.chatClicked == false){
        this.setAccordionStatus();
        this.chatClicked = true;
      }
      this.showLoader =  false;
    }
    else {
      if(this.listener == true){
        this.setAccordionStatus();
      }
      this.chatClicked = false;
    }
  }
  
  ngOnInit() {
    this.getTags();
    this.accordion = Array.from(document.getElementsByClassName('accordionChatOptions') as HTMLCollectionOf<HTMLElement>);
    this.setAccordionStatus();
  }

  removeTimer(timer: any) {
    clearTimeout(timer);
  }

  getTags() {
    if (navigator.onLine === true) {
      this.apiData.getTags().subscribe(result => {
      let parsedResult = result
        if(parsedResult.status === true){
         this.tags = parsedResult.response.artifacts;
        }
        else {
          this.userData.showToast(parsedResult.message);
        }
      },
        error => console.log('HTTP GetTags Error', error));
      } else {
        this.userData.showToast('error',this.NETWORK_OFFLINE_MSG);
     }
   }
  
  updateTag(form: any) {
    if(this._chatOptions !== ''){
      if (navigator.onLine === true && form.valid) {
        if(this.notes.tag.length > 0 || this.notes.note != ''){
          this.apiData.updateTag(form.value,this.customer.chatId).subscribe(result => {
          let parsedResult = result
            if(parsedResult.status === true){
              this.saveNotes();
              this.userData.showToast('success',this.UPDATE_TOAST_MSG);
            } else {
              this.userData.showToast(parsedResult.message);
            }
          },
            error => console.log('HTTP UpdateTags Error', error));
        } else {
          this.userData.showToast('error',this.EMPTY_TOAST_MESSAGE);
        } 
      } else {
        this.userData.showToast('error',this.NETWORK_OFFLINE_MSG);
      }
    } else {
        this.userData.showToast('error',this.EMPTY_CONVERSATION);
    } 
  }

  saveNotes() {
    this.saveNote.emit(this.notes);
  }

  setAccordionStatus(){
    var i;
    for (i = 0; i < this.accordion.length; i++) {
      this.setPanelStatus(this.accordion[i])
      if(this.listener == false){
        var self = this;
        this.accordion[i].addEventListener("click", function(event) {
        self.setPanelStatus(this);
      }); 
     } 
    }
    this.listener = true;  
  }

  setPanelStatus(accordion: any){
    var panel = accordion.nextElementSibling as HTMLElement;
    var expand = accordion.children[0] as HTMLElement;
    var close = accordion.children[1] as HTMLElement;
    if(panel.style.display == 'none'){
      panel.style.display = "block"; 
      expand.style.display = "none";
      close.style.display = "block";
     }
    else {
      panel.style.display = "none";
      expand.style.display = "block";
      close.style.display = "none";
    }
  }
}
