import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getlogin(data): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded'
    //   })};

    const url = `${environment.BASEURL}account/enterprise/login`;

    const body = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
      .set('removeExistingSession', 'true')
      .set('routePath', '')
      .set('appId', 'MOC');

    return this.http.post(url, body.toString());
  }

}
