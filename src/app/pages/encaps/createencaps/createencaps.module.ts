import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateencapsRoutingModule } from './createencaps-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEncapsComponent } from './create-encaps/create-encaps.component';


@NgModule({
  declarations: [CreateEncapsComponent],
  imports: [
    CommonModule,
    CreateencapsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateencapsModule { }
