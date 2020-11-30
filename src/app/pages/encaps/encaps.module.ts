import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncapsRoutingModule } from './encaps-routing.module';
import { EncapsComponent } from './encaps/encaps.component';
import { CreateEncapsComponent } from './create-encaps/create-encaps.component';


@NgModule({
  declarations: [EncapsComponent, CreateEncapsComponent],
  imports: [
    CommonModule,
    EncapsRoutingModule
  ]
})
export class EncapsModule { }
