import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { DashBoardService} from "../../../providers/dash-board.service";

@Component({
  selector: 'app-encaps',
  templateUrl: './encaps.component.html',
  styleUrls: ['./encaps.component.scss']
})
export class EncapsComponent implements OnInit {

  result: any;
  createdCount: any;
  deletedCount: any;
  expiredCount: any;
  pausedCount: any;
  scheduledCount: any;
  startedCount: any;
  stoppedCount: any;
  totalCount: any;
  nameRecent: any;
  idRecent: any;
  recentEncaps: any;
  recentId: any;
  stateRecent: any;
  totalRecent: any;
  CreatedOnRecent: any;
  UpdatedOnRecent: any;
  runningEncaps: any;
  nameRunning: any;
  stateRunning: any;
  totalRunning: any;
  idRunning: any;
  CreatedOnRunning: any;
  UpdatedOnRunning: any;
  closingEncaps: any;
  nameClosing: any;
  stateClosing: any;
  totalClosing: any;
  idClosing: any;
  CreatedOnClosing: any;
  UpdatedOnClosing: any;
  countdetails: any;

  constructor(private DashBoardService: DashBoardService, private storageService:StorageService, private router: Router) { }

  ngOnInit() {
    this.getDashboardcount();
    this.getRecentEncaps();
    this.getClosingsoon();
    this.getRunning();
  }

  getDashboardcount(){
    this.DashBoardService.getDashboardCount().subscribe((res: any)=>{
      this.createdCount = res.response.created;
      this.deletedCount = res.response.deleted;
      this.expiredCount = res.response.expired;
      this.pausedCount = res.response.paused;
      this.scheduledCount = res.response.scheduled;
      this.startedCount = res.response.started;
      this.stoppedCount = res.response.stopped;
      this.totalCount = res.response.total;
    })
  }
  getRecentEncaps(){
    this.DashBoardService.getRecentEncaps().subscribe((res: any)=>{
      this.recentEncaps = res.response['instances'];
    })
  }
  getClosingsoon(){
    this.DashBoardService.getClosingsoon().subscribe((res: any)=>{
      this.closingEncaps = res.response['instances'];
    })
  }
  getRunning(){
    this.DashBoardService.getRunning().subscribe((res: any)=>{
      this.runningEncaps = res.response['instances'];
      this.nameRunning = res.response.instances[0].name;
      this.stateRunning = res.response.instances[0].state;
      this.totalRunning = res.response.instances[0].total;

      this.idRunning = this.runningEncaps.map(value => {
        return value._id.$oid;
      });
      this.CreatedOnRunning = this.runningEncaps.map(value => {
        return value.createdOn.$date;
      });
      this.UpdatedOnRunning = this.runningEncaps.map(value => {
        return value.updatedOn.$date;
      });
    })
  }
  
}
