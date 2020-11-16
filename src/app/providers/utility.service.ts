import { StorageService } from './storage/storage.service';
import { storage } from './storage/storage';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private storageSerivce: StorageService, private http:HttpClient) { }

  logOut() {
    this.removeAllLocalStorage();
    return this.http.get(`${environment.BASEURL}account/logout`);
  }

  removeAllLocalStorage() {
    this.storageSerivce.removeToken();
    //  storage.removeToken();
    // console.clear();
  }

}
