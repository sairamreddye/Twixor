import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
// import { EncryptService } from './encrypt.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, tap, first, catchError } from 'rxjs/operators';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from './utility.service';
// import { ToastrService } from 'ngx-toastr';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  apiCount: number = 0;

  constructor(
    private utilityService: UtilityService,
    private storageService: StorageService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.ngxUiLoaderService.start();
    this.apiCount++;
    let httpMethod = req.method;
    console.log('reqBody', req.body);
    console.log('req', req);
    
    const token: string = this.storageService.getToken();
    const loginRequest: any = req.clone({ setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: req.body });
    const getRequest: any = req.clone({ setHeaders: { 'authentication-token': token }, body: req.body });


    let Request

    if (httpMethod === 'POST') {
      if (req.url.includes('enterprise/login')) {   // todo condition for POST method for api errors and responses
        if (loginRequest.headers.has('Content-Type')) {
          //debugger
          this.storageService.removeToken();
          Request = loginRequest;
        }
      }
      console.log(`Requrl:${req.url}`);
    }
    else if (httpMethod === 'GET') {
      if (req.url.includes('enterprise/campaigns/reports')) {
        if (getRequest.headers.has('authentication-token')) {    // todo condition for GET method for api errors and responses
          //debugger
          Request = getRequest;
        }
      }
      console.log(`Requrl:${req.url}`);
    }
    else {    //todo condition if any one condition is not satisfied
      Request = req;
    }
    // console.log('Request', req);
    return next.handle(Request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status != 200) {
            console.log('httpErr', err);
            // this.ngxUiLoaderService.stop();
            if (err.status != 401 && err.status != 500) {
              if (err.status === 0) {
                // this.toasterService.error(`Connection not available! Please try again later.`, 'Technical error..');
              } else {
                // this.toasterService.error(`${err.status}: ${err.statusText}`, 'Technical error..');
              }
            }
          }
        }
        return throwError(err);
      }),
      map(
        (event: HttpEvent<any>) => {
          let res;
          this.apiCount--;
          if (event instanceof HttpResponse) {
            if (event.headers.get('content-type') == 'text/plain') {
              event = event.clone({
                // body: JSON.parse(this.encrytionService.decryptResponse(event)),
              });
              res = event.body;
            } else {
              if (
                event.headers.get('content-type') != 'text/plain' &&
                typeof event.body != 'object'
              ) {
                res = JSON.parse(event.body);
              }
              if (res && res['login_required']) {
                // this.utilityService.logOut();
                this.utilityService.removeAllLocalStorage();
              }
            }
            console.log('Response Body: ', event.body);

            if (res && res['Error'] === '1') {
              alert(res['ErrorMessage']);
            }
            // this.ngxUiLoaderService.stop();
            this.checkApiCount();
            return event;
          } else {
            // this.ngxUiLoaderService.stop();
            console.log('authenticateErrorevent', event);
          }
        },
        (err: any) => {
          console.log('authenticateError', err);
          this.checkApiCount();
        }
      )

    );
  }

  checkApiCount() {
    if (this.apiCount <= 0) {
      console.log('this.apiCount', this.apiCount)
      // this.ngxUiLoaderService.stop();
    }
  }
}