import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChathistoryRoutingModule } from './chathistory-routing.module';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [ChathistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChathistoryRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class ChathistoryModule { }
