import { MainchatComponent } from './mainchat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from '../chats/chat/chat.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';

const routes: Routes = [
  {
    path:'',
    component:MainchatComponent,
    children:[
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path:'analytics',
        component:AnalyticsComponent
      },
      {
        path:'chat-history',
        component: ChathistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainchatRoutingModule { }
