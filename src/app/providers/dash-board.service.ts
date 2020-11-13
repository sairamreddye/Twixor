import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  dashBoardUrlext:any = `e/enterprise/campaigns/reports/`
  authToken:string = "Y02UcasqJOTzHxlEp4iwfMbY5MglTeUkHDY8yIC7jbEfXZJCEMLuKFgxM9RtZPcl";
  constructor(private router: Router, private http: HttpClient) { }

  getDashboardCount():Observable<any> {
    const url = `${environment.BASEURL}${this.dashBoardUrlext}instanceCount`
  // const url = "https://aim.twixor.com/e/enterprise/campaigns/reports/instanceCount"
   //const headers = new HttpHeaders().set('authentication-token',this.authToken);
   return this.http.get(url);
 }
 
 getRecentEncaps():Observable<any> {
    const url = `${environment.BASEURL}${this.dashBoardUrlext}instances?filter=recent&from=0&perPage=4`
   //const url = "https://aim.twixor.com/e/enterprise/campaigns/reports/instances?filter=recent&from=0&perPage=4"
  // const headers = new HttpHeaders().set('authentication-token',this.authToken);
   return this.http.get(url);
 }

 getClosingsoon():Observable<any> {
   const url = `${environment.BASEURL}${this.dashBoardUrlext}instances?filter=closing&from=0&perPage=4`
   //const url = "https://aim.twixor.com/e/enterprise/campaigns/reports/instances?filter=closing&from=0&perPage=4"
  // const headers = new HttpHeaders().set('authentication-token',this.authToken);
   //return this.http.get(url, {headers});
   return this.http.get(url);
 }
 getRunning():Observable<any> {
   //const url = "https://aim.twixor.com/e/enterprise/campaigns/reports/instances?filter=running&from=0&perPage=4"
   const url = `${environment.BASEURL}${this.dashBoardUrlext}instances?filter=running&from=0&perPage=4`
  // const headers = new HttpHeaders().set('authentication-token',this.authToken);
   return this.http.get(url);
 }
}
