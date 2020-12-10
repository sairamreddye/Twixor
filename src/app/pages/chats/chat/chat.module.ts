import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatOptionsComponent } from './chat-options/chat-options.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { ChatProcessComponent } from './chat-process/chat-process';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [ChatComponent,ConversationComponent,ChatOptionsComponent,AttachmentComponent,ChatProcessComponent],
  entryComponents: [AttachmentComponent,ChatProcessComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    NgSelectModule,
    MatDialogModule
  ],
})
export class ChatModule { }
