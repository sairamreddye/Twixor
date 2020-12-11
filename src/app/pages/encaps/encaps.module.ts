import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncapsRoutingModule } from './encaps-routing.module';
// import { EncapsComponent } from './encaps/encaps.component';
// import { CreateEncapsComponent } from './create-encaps/create-encaps.component';
import { MainencapsComponent } from './mainencaps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncapsComponent } from './encapsdashboard/encaps/encaps.component';
import { CreateEncapsComponent } from './createencaps/create-encaps/create-encaps.component';


@NgModule({
  declarations: [MainencapsComponent],
  imports: [
    CommonModule,
    EncapsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EncapsModule { }
