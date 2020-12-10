import { Component, OnInit, Inject } from '@angular/core';
import { DashBoardService} from "../../../providers/dash-board.service";
import { StorageService } from 'src/app/providers/storage/storage.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {
  //journeydata: any =[];
  result: any =[];
  @ViewChild('f', { static: false }) myForm;
  JourneyForm = this.fb.group({
    name: ['', Validators.required],
    phone: [''],
    channel:  ['']

  });
 
  journeydata =  {
    "message": "Fetched successfully",
    "code": 100,
    "status": true,
    "data": {
      "journeys": [
        {
          "id": "5fcf65b4017b0523d65cc602",
          "eId": 103,
          "uId": 0,
          "name": "Deltin_Ordering",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-12-08T11:38:28.610+0000",
          "updatedOn": "2020-12-10T10:26:24.836+0000"
        },
        {
          "id": "5fc8bf87017b0523d65b8f27",
          "eId": 103,
          "uId": 0,
          "name": "Sify",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-12-03T10:35:51.585+0000",
          "updatedOn": "2020-12-03T12:17:33.042+0000"
        },
        {
          "id": "5f3fa620017b05316adf8ff4",
          "eId": 103,
          "uId": 0,
          "name": "App Testing",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-08-21T10:46:56.894+0000",
          "updatedOn": "2020-11-24T10:20:12.670+0000"
        },
        {
          "id": "5e60a0bdb3795f4c928531a7",
          "eId": 103,
          "uId": 0,
          "name": "Test Journey",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-03-05T06:48:29.453+0000",
          "updatedOn": "2020-11-23T09:41:07.966+0000"
        },
        {
          "id": "5f6b18d7017b0576e786e805",
          "eId": 103,
          "uId": 0,
          "name": "axis-pdf-test",
          "type": "WHATSAPP",
          "phoneNumber": "9874561230",
          "createdOn": "2020-09-23T09:43:51.153+0000",
          "updatedOn": "2020-11-03T10:14:53.459+0000"
        },
        {
          "id": "5f8d4420017b0552d10fac06",
          "eId": 103,
          "uId": 0,
          "name": "Annapurna",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-10-19T07:45:36.581+0000",
          "updatedOn": "2020-10-20T05:38:30.942+0000"
        },
        {
          "id": "5f89672c017b0552d10f7f31",
          "eId": 103,
          "uId": 0,
          "name": "Kulcha_King_Ecommerce",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-10-16T09:26:04.390+0000",
          "updatedOn": "2020-10-16T09:26:19.115+0000"
        },
        {
          "id": "5f85885d017b0576e78899b0",
          "eId": 103,
          "uId": 0,
          "name": "Wakira Group",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-10-13T10:58:37.281+0000",
          "updatedOn": "2020-10-14T10:08:58.110+0000"
        },
        {
          "id": "5f840865017b0576e7888785",
          "eId": 103,
          "uId": 0,
          "name": "axis-pdf-test_copy",
          "type": "WHATSAPP",
          "phoneNumber": "9874561230",
          "createdOn": "2020-10-12T07:40:21.059+0000",
          "updatedOn": "2020-10-12T07:40:21.059+0000"
        },
        {
          "id": "5f6488b5017b0576e7868ca0",
          "eId": 103,
          "uId": 0,
          "name": "Axis Location",
          "type": "WHATSAPP",
          "phoneNumber": "",
          "createdOn": "2020-09-18T10:15:17.335+0000",
          "updatedOn": "2020-09-18T10:15:17.335+0000"
        },
        {
          "id": "5f521380017b054a13ef5d4f",
          "eId": 103,
          "uId": 0,
          "name": "Lending Us Case",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-09-04T10:14:24.810+0000",
          "updatedOn": "2020-09-18T06:33:27.337+0000"
        },
        {
          "id": "5f619c1f017b051a50cf6735",
          "eId": 103,
          "uId": 0,
          "name": "ModiCare WhatsApp",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-09-16T05:01:19.807+0000",
          "updatedOn": "2020-09-18T06:33:10.291+0000"
        },
        {
          "id": "5dcbdd59b3795f32e1f33271",
          "eId": 103,
          "uId": 0,
          "name": "Test",
          "type": "WHATSAPP",
          "phoneNumber": "+917760686668",
          "createdOn": "2019-11-13T10:39:21.004+0000",
          "updatedOn": "2020-07-09T10:40:29.891+0000"
        },
        {
          "id": "5e1d6e6eb3795f0aeeed709e",
          "eId": 103,
          "uId": 0,
          "name": "Live Agent",
          "type": "WHATSAPP",
          "phoneNumber": "+13253077759",
          "createdOn": "2020-01-14T07:31:58.117+0000",
          "updatedOn": "2020-07-07T11:08:10.561+0000"
        },
        {
          "id": "5ecb9098017b054951dbe5b0",
          "eId": 103,
          "uId": 0,
          "name": "Test",
          "type": "WHATSAPP",
          "phoneNumber": "8390248006",
          "createdOn": "2020-05-25T09:32:08.499+0000",
          "updatedOn": "2020-06-16T07:10:25.475+0000"
        }
      ],
      "more": true
    }
  }
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private DashBoardService: DashBoardService, private storageService:StorageService,private fb:FormBuilder) { }

  ngOnInit() {
    //debugger
    //this.getjourneylist();
    this.result = this.journeydata.data['journeys']
  }
  getjourneylist(){
    debugger
    this.DashBoardService.getjourneylist().subscribe((res: any)=>{
      //this.journeydata = res.response['journeys'];
      this.result = res;
    })
}
  updateProfile() { //to intilize the form values this method will used;
    this.JourneyForm.patchValue({
      name: ""
    });
  }
  submit($event) {
    $event.preventDefault();
  const obj = new MyObj();
  const formOutput = Object.assign(obj, this.JourneyForm.value);
  const name = formOutput.name;
  const phone = formOutput.phone;
  const channel = formOutput.channel;
    debugger
    console.log(this.myForm)
  //this.createjourney(name);
  console.log(this.JourneyForm.value)
  }    
  reset() {
    this.myForm.resetForm(); // <-- ici
    this.JourneyForm.reset();
    // this.updateProfile();
  }
  close(){
    document.getElementById("myModal").style.display = 'none';
    //this.showmodel = true
   // if(this.showmodel = true){
      document.getElementById("myModal").style.opacity = '0';
    //}
  }
  createjourney(name){

    this.DashBoardService.createJourney(name).subscribe((res: any)=>{
      this.result = res;
      console.log(this.result);
      
    });
    
    // if(this.Encapform.value.encapName==this.Encapsdata.name){
    //   alert("department name is all ready ")
    // }
    this.close();
    
    this.getjourneylist();
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
  name:any;
  phone:any;
  channel:any;
}