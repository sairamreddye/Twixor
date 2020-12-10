import { MainchatComponent } from './mainchat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:MainchatComponent,
    children:[
      {
        path: 'conversation',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
      },
      {
        path:'analytics',
        loadChildren: () => import('./chatanalytics/chatanalytics.module').then(m => m.ChatanalyticsModule)
      },
      {
        path:'chat-history',
        loadChildren: () => import('./chathistory/chathistory.module').then(m => m.ChathistoryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainchatRoutingModule { }
