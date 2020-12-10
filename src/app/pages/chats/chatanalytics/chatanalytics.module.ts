import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatanalyticsRoutingModule } from './chatanalytics-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatInputModule, MatRadioModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatRippleModule,
    // MatInputModule,
    // MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    // NgSelectModule,
    MatSelectModule,
    FormsModule,ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatInputModule,
    ChatanalyticsRoutingModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ChatanalyticsModule { }
