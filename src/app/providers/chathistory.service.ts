import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChathistoryService {

  constructor(private http: HttpClient) { }

chatHistory(a,b,c,d,e,f){
  const baseURL = `https://aim.twixor.com/e/enterprise/chat/history?&from=${a}&perPage=${b}&state=${c}&departmentsRequired=${d}&startDate=${e}&endDate=${f}&_=1606295140565`
  return this.http.get(baseURL);
}
chatHistoryDropdown(name,number): Observable<any[]>{
  const baseURL = `https://aim.twixor.com/e/enterprise/customers?name=${name}&from=${number}&perPage=2&_=1606317437543`;
  return this.http.get<any>(baseURL);
}
chatHistoryUserAgent(){
  const baseURL = `https://aim.twixor.com/e/enterprise/artifacts?desc=&from=0&perPage=10&type=4&deptId=&_=1606541652940`;
  return this.http.get(baseURL);
}
}
