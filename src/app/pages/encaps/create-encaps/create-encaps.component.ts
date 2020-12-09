import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { DashBoardService} from "../../../providers/dash-board.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-encaps',
  templateUrl: './create-encaps.component.html',
  styleUrls: ['./create-encaps.component.scss']
})
export class CreateEncapsComponent implements OnInit {
  Encapsdata: any =[];
  result: "";
  newencap: any;
  @ViewChild('f', { static: false }) myForm;
  Encapform = this.fb.group({
    encapname: ['', Validators.required],
  
  });
  
  constructor(private DashBoardService: DashBoardService, private storageService:StorageService,private fb:FormBuilder) { }

  ngOnInit() {
    
    this.getEncapslist();
    //this.createEncaps(name);   
  }

  updateProfile() { //to intilize the form values this method will used;
    this.Encapform.patchValue({
      encapname: ""
    });
  }
  submit($event) {
    $event.preventDefault();
  const obj = new MyObj();
  const formOutput = Object.assign(obj, this.Encapform.value);
  const encapName = formOutput.encapname;
  this.createEncaps(encapName);
  }    
  
  reset() {
    this.myForm.resetForm(); // <-- ici
    this.Encapform.reset();
    // this.updateProfile();
  }
  getEncapslist(){
    this.DashBoardService.getEncapslist().subscribe((res: any)=>{
      this.Encapsdata = res.response['campaigns'];
    })
}
createEncaps(name){

  this.DashBoardService.createEncaps(name).subscribe((res: any)=>{
    this.result = res;
    console.log(this.result);
    //this.newencap = res.response['campaigns'];
   // window.location.reload()
  });
  // window.location.reload()
  this.getEncapslist();
}

}
class MyObj {
  // select: string;
  // input: string;
  // date: number;
  encapname:any;
}