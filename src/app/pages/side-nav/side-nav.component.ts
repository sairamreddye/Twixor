import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { UtilityService } from 'src/app/providers/utility.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
   accordion:any;
  constructor( private router: Router, private logoutService:UtilityService,private storageService:StorageService,
    ) { }

  ngOnInit() {     
    this.accordion =  Array.from(document.getElementsByClassName('accordionSidebar') as HTMLCollectionOf<HTMLElement>);
    this.setAccordionStatus();
  }

  setAccordionStatus(){
    var i;
    for (i = 0; i < this.accordion.length; i++) {
       if(i == 0){
         this.accordion[i].nextElementSibling.style.display = 'none';
      }
      this.setPanelStatus(this.accordion[i]);
      var self = this;
      this.accordion[i].addEventListener("click", function(event) {
        self.setPanelStatus(this);
      });  
     }  
  }

  setPanelStatus(accordion: any){
     var panel = accordion.nextElementSibling as HTMLElement;
      var expand = accordion.children[2] as HTMLElement;
      var close = accordion.children[3] as HTMLElement;
       if(panel.style.display == 'none'){
         panel.style.display = "block";
        expand.style.display = "none";
        close.style.display = "block";
       }
       else {
          panel.style.display = "none";
          expand.style.display = "block";
          close.style.display = "none";
        }
     }
     dashboard(){
     const userToken = this.storageService.getToken();
     this.router.navigateByUrl(`/dashboard?authToken=${userToken}`);
    }
     logOut(){
       this.logoutService.logOut().subscribe();
      //  this.router.navigateByUrl(`/login`); //yet to do
     }
     chat(){
     const userToken = this.storageService.getToken();
     this.router.navigateByUrl(`/chat?authToken=${userToken}`);
    }
    encaps(){
     const userToken = this.storageService.getToken();
     this.router.navigateByUrl(`/encaps?authToken=${userToken}`);
    }
    createencaps(){
      const userToken = this.storageService.getToken();
      this.router.navigateByUrl(`encaps/createencaps?authToken=${userToken}`);
     }
    analytics(){
      const userToken = this.storageService.getToken();
     this.router.navigateByUrl(`/analytics?authToken=${userToken}`);
    }
    chatHistory(){
      const userToken = this.storageService.getToken();
     this.router.navigateByUrl(`/chat-history?authToken=${userToken}`);
    }
}
