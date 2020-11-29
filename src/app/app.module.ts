import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiDataService } from './providers/api-data.service';
import { UserDataService } from './providers/user-data.service';
import { WildcardComponent } from './pages/wildcard/wildcard.component';
import { ErrorComponent } from './pages/error/error.component';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { FullLayoutComponent } from './pages/full-layout/full-layout.component';
import { AuthInterceptor } from './providers/auth.interceptor.service';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material';
@NgModule({

  declarations: [
    AppComponent,
    WildcardComponent,
    ErrorComponent,
    SideNavComponent,
    FullLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  bootstrap: [AppComponent],
  providers: [
    UserDataService,
    ApiDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]

})
export class AppModule { }
