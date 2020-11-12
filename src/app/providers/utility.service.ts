import { StorageService } from './storage/storage.service';
import { storage } from './storage/storage';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(private storageSerivce: StorageService) { }

  logOut() {
    this.removeAllLocalStorage();
  }

  removeAllLocalStorage() {
    this.storageSerivce.removeToken();
    //  storage.removeToken();
    console.clear();
  }

}
