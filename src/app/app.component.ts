import { Component,OnDestroy } from '@angular/core';
import { MessageService } from './providers/websocket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  
  constructor(private messageService: MessageService) {
  }
 
  ngOnDestroy() {
    this.messageService.chatSubscription.unsubscribe();
    this.messageService.close();
  }
}
