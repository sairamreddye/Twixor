import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { DashBoardService} from "../../../providers/dash-board.service";

@Component({
  selector: 'app-create-encaps',
  templateUrl: './create-encaps.component.html',
  styleUrls: ['./create-encaps.component.scss']
})
export class CreateEncapsComponent implements OnInit {
  Encapsdata: any =[];
  result: any = [];
  newencap: any;

  constructor(private DashBoardService: DashBoardService, private storageService:StorageService) { }

  ngOnInit() {
    debugger
    this.getEncapslist();
    
  }
  getEncapslist(){
    this.DashBoardService.getEncapslist().subscribe((res: any)=>{
      this.Encapsdata = res.response['campaigns'];
    })
}
createEncaps(name){
  this.DashBoardService.createEncaps(name).subscribe((res: any)=>{
    //this.result = res
    this.newencap = res.response['campaigns'];
  })
}
}