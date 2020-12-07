import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainchatRoutingModule } from './mainchat-routing.module';
import { MainchatComponent } from './mainchat.component';

import { ChatComponent } from '../chats/chat/chat.component';
import { ConversationComponent } from '../chats/chat/conversation/conversation.component';
import { ChatOptionsComponent } from '../chats/chat/chat-options/chat-options.component';
import { AttachmentComponent } from '../chats/chat/attachment/attachment.component';
import { ChatProcessComponent } from '../chats/chat/chat-process/chat-process';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from '../../providers/websocket.service';

import { ChathistoryComponent } from './chathistory/chathistory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatInputModule, MatRadioModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AnalyticsComponent } from './analytics/analytics.component';;



@NgModule({
  declarations: [MainchatComponent,ChatComponent,ConversationComponent,ChatOptionsComponent,AttachmentComponent,ChatProcessComponent,ChathistoryComponent,AnalyticsComponent],
  entryComponents: [AttachmentComponent,ChatProcessComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
    MainchatRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    NgSelectModule,
    MatSelectModule,
    FormsModule,ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatInputModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [MessageService]
})
export class MainchatModule { }
