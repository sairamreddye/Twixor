import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { storage } from './storage/storage';
import { UtilityService } from './utility.service';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class Authguard implements CanActivate {

  constructor(private utilityService: UtilityService, private storageService: StorageService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const checkToken: boolean = this.storageService.checkToken();
    if (checkToken) {
      return new Observable<boolean>((observer) => {
        observer.next(true);
      });
    } else {
      this.utilityService.logOut();
      return false;
    }
  }
}
