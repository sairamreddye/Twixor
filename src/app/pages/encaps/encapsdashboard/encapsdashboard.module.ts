import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncapsdashboardRoutingModule } from './encapsdashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncapsComponent } from './encaps/encaps.component';


@NgModule({
  declarations: [EncapsComponent],
  imports: [
    CommonModule,
    EncapsdashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EncapsdashboardModule { }
