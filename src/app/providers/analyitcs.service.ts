import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment.prod'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyitcsService {
  
 
 constructor(private http: HttpClient) { }

 get(url: string): Observable<any> {
  return this.http.get(url);
}
put(url: string, data: any): Observable<any> {
  return this.http.put(url,data);
}
post(url: string, data: any): Observable<any> {
  return this.http.post(url,data);
}

  analytics(a,b,c,d,e,f,g,h){
   const baseurl =`${environment.BASEURL}e/enterprise/chat/dashboard_info?fromDate=${a}T00%3A00%3A00.000&toDate=${b}T23%3A59%3A00.000&clientOffset=${c}&timeType=${d}&currentDate=${e}&department=${f}&agent=${g}&departmentsRequired=${h}&_=1605677463250`;
    return this.get(baseurl);
  }
  analyticsFormsubmission(dynamicUrl){
    debugger
    const baseurl =`${environment.BASEURL}e/enterprise/chat/dashboard_info?${dynamicUrl}&_=1605677463250`;
    return this.get(baseurl);
  }
}
