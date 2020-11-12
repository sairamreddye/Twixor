import { Injectable } from '@angular/core';
import { storage } from './storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(token) {
    return storage.setToken(token);
  }

  getToken() {
    return storage.getToken();
  }

  checkToken() {
    return storage.checkToken();
  }

  removeToken() {
    return storage.removeToken();
  }

}
