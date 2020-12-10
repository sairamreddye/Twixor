import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainchatRoutingModule } from './mainchat-routing.module';
import { MainchatComponent } from './mainchat.component';
import { MessageService } from '../../providers/websocket.service';
@NgModule({
  declarations: [MainchatComponent],
  imports: [
    CommonModule,
    MainchatRoutingModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [MessageService]
})
export class MainchatModule { }
