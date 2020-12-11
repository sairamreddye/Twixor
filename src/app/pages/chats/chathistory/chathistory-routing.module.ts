import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChathistoryComponent } from './history/chathistory.component';


const routes: Routes = [
  {
    path:"",
    component:ChathistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChathistoryRoutingModule { }
