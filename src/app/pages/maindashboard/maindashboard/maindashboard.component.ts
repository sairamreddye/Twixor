import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/providers/storage/storage.service';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss']
})
export class MaindashboardComponent implements OnInit {

  constructor(private storageService:StorageService, private router: Router) { }

  ngOnInit() {
  }
  chat(){
   const userToken = this.storageService.getToken();
   this.router.navigateByUrl(`/chat?authToken=${userToken}`);
  }
  encaps(){
   const userToken = this.storageService.getToken();
   this.router.navigateByUrl(`/encaps/dashboard?authToken=${userToken}`);
  }
}
