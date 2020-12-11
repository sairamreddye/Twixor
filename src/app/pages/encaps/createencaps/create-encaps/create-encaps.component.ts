import { Component, OnInit , Inject} from '@angular/core';
import { StorageService } from 'src/app/providers/storage/storage.service';
import { DashBoardService} from "../../../../providers/dash-board.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
 import { DOCUMENT } from '@angular/common';

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
  showmodel:boolean;
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private DashBoardService: DashBoardService, private storageService:StorageService,private fb:FormBuilder) {
    this.showmodel = true
   }

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
close(){
  document.getElementById("myModal").style.display = 'none';
  //this.showmodel = true
 // if(this.showmodel = true){
    document.getElementById("myModal").style.opacity = '0';
  //}
}

createEncaps(name){

  this.DashBoardService.createEncaps(name).subscribe((res: any)=>{
    this.result = res;
    console.log(this.result);
    
  });
  
  // if(this.Encapform.value.encapName==this.Encapsdata.name){
  //   alert("department name is all ready ")
  // }
  this.close();
  
  this.getEncapslist();
  setTimeout(() => {
    this.refresh();
  }, 1500);
  
}
refresh() {
  this._document.defaultView.location.reload();
}

}
class MyObj {
  // select: string;
  // input: string;
  // date: number;
  encapname:any;
}