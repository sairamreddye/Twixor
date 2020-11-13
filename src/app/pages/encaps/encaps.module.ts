import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncapsRoutingModule } from './encaps-routing.module';
import { EncapsComponent } from './encaps/encaps.component';


@NgModule({
  declarations: [EncapsComponent],
  imports: [
    CommonModule,
    EncapsRoutingModule
  ]
})
export class EncapsModule { }
