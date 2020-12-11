import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  // get(url: string): Observable<any> {
  //   return this.http.get(url);
  // }
  // put(url: string, data: any): Observable<any> {
  //   return this.http.put(url);
  // }
  post(url: string, data: any): Observable<any> {
    return this.http.post(url,data);
  }
  
  getlogin(data): Observable<any> {
    const url = `${environment.BASEURL}account/enterprise/login`;
    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
      .set('removeExistingSession', 'true')
      .set('routePath', '')
      .set('appId', 'MOC');

    return this.post(url, body.toString());
  }

}
