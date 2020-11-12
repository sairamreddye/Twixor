import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, retryWhen, delayWhen,share } from 'rxjs/operators';
import { EMPTY, Subject, Observable, timer } from 'rxjs';
import { UserDataService } from './user-data.service';
import { ApiDataService } from './api-data.service' 
import { AppConfig } from '../providers/APP_CONFIG';
import { environment } from '../../environments/environment.prod';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  chatSubscription: Subscription;
  connection: WebSocketSubject<any>;
  connectionStatus:boolean;
  messagesSubject = new Subject<any>();
  constructor(private userData: UserDataService,
  private apiData: ApiDataService) {
   }

  connect(reconnect: boolean){
    if(reconnect == false){
        this.getSocket().then(()=>{
        this.subscribeSocket();
        })
      }
    else {
        this.callReconnect().then(()=>{
        this.subscribeSocket();
      })
    }
  }

  async getSocket() {
   let url = environment.BASEURL.replace('https','wss')+'actions?token=' + encodeURIComponent(this.apiData.authToken);
      this.connection = this.getNewWebSocket(url);
  }
   
  async callReconnect(){
    await this.reconnect(this.connection).pipe(
      tap({ 
      error: error => console.log(error),
    }), catchError(error => EMPTY))
  }

  subscribeSocket() {
    this.connection.subscribe(
      msg => {
        console.log('message received: ',msg.action);
        this.messagesSubject.next(msg);
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  getSubscription(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  reconnect(observable: Observable<any>): Observable<any> {
    console.log('from reconnect connection')
    return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[Message Service] Try to reconnect', val)),
    delayWhen(event => timer(AppConfig.ENV.WEBSOCKET.INITIAL_RECONNECT, AppConfig.ENV.WEBSOCKET.RECONNECT_INTERVAL)))));
  }

  getNewWebSocket(url: string) {
      return webSocket({
        url: url,
        openObserver: {
          next: (Event) => {
            this.connectionStatus = true;
            console.log('[Message Service]: connection opened');
          }
        },
        closeObserver: {
          next: (closeEvent) => {
            console.log('closeEvent',closeEvent);
            if(closeEvent.code === 4001){
              this.userData.navigate('/error');
            }
            else {
              this.connectionStatus = false;
              console.log('[Message Service]: connection closed');
              this.connect(true);
            }
          }
        },
          serializer: msg => JSON.stringify(msg)
      })
    }

  sendMessage(msg: any) {
    this.connection.next(msg);
      if(msg.action === 'agentCloseChat'){
        this.messagesSubject.next(msg)
    }
    // console.log('from sendMessage', msg);
  }

  close() {
    console.log('from close connection');
    this.connection.complete();
  }

}
