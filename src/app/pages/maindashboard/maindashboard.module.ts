import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaindashboardRoutingModule } from './maindashboard-routing.module';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';


@NgModule({
  declarations: [MaindashboardComponent],
  imports: [
    CommonModule,
    MaindashboardRoutingModule
  ]
})
export class MaindashboardModule { }
