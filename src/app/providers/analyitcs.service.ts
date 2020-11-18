import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class AnalyitcsService {
  
 baseurl:any ="https://aim.twixor.com/e/enterprise/chat/dashboard_info?fromDate=2020-11-12T00%3A00%3A00.000&toDate=2020-11-18T23%3A59%3A00.000&clientOffset=-330&timeType=DAY&currentDate=2020-11-18&department=&agent=0&departmentsRequired=true&_=1605677463250"

 constructor(private http: HttpClient) { }

  analytics(){
    return this.http.get(this.baseurl)
  }
}
