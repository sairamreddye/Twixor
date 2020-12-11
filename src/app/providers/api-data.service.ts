import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  authToken: string = '';
  constructor(private http: HttpClient) {

  }

  getUserId() {
    return this.get(environment.BASEURL + 'e/enterprise/profile/');
  }

  updateTag(notes: any, chatId: string) {
    let params = new HttpParams()
      .set('tag', notes.tag)
      .set('note', notes.note);
    return this.put(environment.BASEURL + 'e/enterprise/chat/' + chatId + '/update_tag', params);
  }

  getTags() {
    return this.get(environment.BASEURL + 'e/enterprise/artifacts?desc=&from=0&perPage=10&type=4&deptId=&_=1601711697677');
  }

  getActiveChat() {
    return this.get(environment.BASEURL + 'e/enterprise/chat/summary');
  }

  getClosedChat(params: any) {
    return this.get(environment.BASEURL + 'e/enterprise/chat/history?state=3&startDate=' + encodeURIComponent(params.startDate) + '&endDate=' + encodeURIComponent(params.endDate) + '&perPage=10&from=0');
  }

  getChatHistory(params: any) {
    return this.get(environment.BASEURL + 'e/enterprise/chat/history?from=0&perPage=10&state=3&departmentsRequired=true&customer=' + encodeURIComponent(params.cId) + '&startDate=' + encodeURIComponent(params.startDate) + '&endDate=' + encodeURIComponent(params.endDate));
  }

  getAttachment(type: any, visibility: any) {
    return this.get(environment.BASEURL + 'e/enterprise/artifacts?type=' + type + '&from=0' + '&perPage=10&desc=&visibility=' + visibility);
  }

  getAgents() {
    return this.get(environment.BASEURL + 'e/enterprise/users?roles=%5B3%5D&agentStatus=0&perPage=100');
  }

  getDepartments() {
    return this.get(environment.BASEURL + 'e/enterprise/departments');
  }

  get(url: string): Observable<any> {
    // const headers = new HttpHeaders().set('authentication-token', this.authToken);
    return this.http.get(url);
  }
  put(url: string, data: any): Observable<any> {
    // const headers = new HttpHeaders().set('authentication-token', this.authToken);
    return this.http.put(url, data);
  }
  post(url: string, data: any): Observable<any> {
    // const headers = new HttpHeaders().set('authentication-token', this.authToken);
    return this.http.post(url, data);
  }
}
