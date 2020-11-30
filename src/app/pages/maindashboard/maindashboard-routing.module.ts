import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEncapsComponent } from '../encaps/create-encaps/create-encaps.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';


const routes: Routes = [
  {
    path: "",
    component: MaindashboardComponent
  }
  // {
  //   path: "createencaps",
  //   component: CreateEncapsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindashboardRoutingModule { }
