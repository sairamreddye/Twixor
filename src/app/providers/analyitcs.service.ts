import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class AnalyitcsService {
  
 
 constructor(private http: HttpClient) { }

  analytics(a,b,c,d,e,f,g){
    debugger;
   const baseurl =`https://aim.twixor.com/e/enterprise/chat/dashboard_info?fromDate=${a}T00%3A00%3A00.000&toDate=${b}T23%3A59%3A00.000&clientOffset=${c}&timeType=${d}&currentDate=${e}&department=&agent=${f}&departmentsRequired=${g}&_=1605677463250`
    return this.http.get(baseurl)
  }
}
