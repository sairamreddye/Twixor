import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneyRoutingModule } from './journey-routing.module';
import { JourneyComponent } from './journey/journey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [JourneyComponent],
  imports: [
    CommonModule,
    JourneyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JourneyModule { }
