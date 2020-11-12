import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-options';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user:any = '';
  toastSubject =  new Subject<any>();
  TOAST_DURATION = 6000;
  constructor(private router: Router) { }

   showToast(type: any, body?: string) {
    //  console.log('toast',type,body);
    let params = { type, body,delay:this.TOAST_DURATION };
    this.toastSubject.next(params);
   }

  getSubscription(): Observable<any> {
    return this.toastSubject.asObservable();
  }
    async getChatList(Chats:any) {
    let processedChat = Chats;
    await processedChat.map(function (chat) {
      if(!chat.messages[chat.messages.length - 1].attachment){
         chat.messages[chat.messages.length - 1].attachment = '';
     }
      if(!chat.messageCount){
        chat.messageCount = chat.messages.length;
        chat.newMsgCount = 0;
     }
   });
      return processedChat;
  }

  navigate(route){
    this.router.navigateByUrl(route);
  }
}
