import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';


const routes: Routes = [
  {
    path: "",
    component: MaindashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindashboardRoutingModule { }
