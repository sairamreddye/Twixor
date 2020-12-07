import { Component, OnInit, ViewChild } from '@angular/core';
import { ChathistoryService } from '../../../providers/chathistory.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { Observable } from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
// import { catchError, map, tap, startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.scss'],
  providers: [
    DatePipe
  ]
})

export class ChathistoryComponent implements OnInit {
  @ViewChild('f', { static: false }) myForm;
  historyForm = this.fb.group({
    customerPhone: ['', Validators.required],
    startdate: ['', Validators.required],
    enddate: ['', Validators.required],
    department: ['', Validators.required],
    agent: ['', Validators.required],
    searchedData: [''],
    focusedData: ['', Validators.required],
    selectedStatus: ['', Validators.required]
  });
  startDate: any;
  endDate: any;
  clientOffset: number;
  timeType: string;
  currentDate: string;
  departmentAgent: number;
  departmentsRequired: boolean;
  parametersCheck: any = true;
  department: any;
  agent: any;
  analyticDepartment: any;
  analyticAgent: any;
  options: any[] = [];
  evenNumber = 0;
  filteredOptions: Observable<any[]>;
  searchParam: any;
  filteredData: any = [];
  from: any;
  perPage: string;
  state: string;
  historyDepartment: any;
  historyAgent: any;
  searchedOutput: any;
  userTag: any;
  focusedData: any = [];
  selectedStatus: number;
  radioData: any = [
    { key: "CLOSED", value: 3 },
    { key: "MISSED", value: 4 }
  ];
  chatStatus: any = [
    { key: "ONGOING", value: 2 },
    { key: "CLOSED", value: 3 }
  ];
  selectedProductsItems: any;
  products: any[];
  urlString: any;
  finalUrl: any;
  chatHistoryData: any = [];
  determined: any = [];
  isValid:boolean;

  constructor(private chathistory: ChathistoryService, private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.historyData();
    this.updateProfile();
  }

  forIntialApigetStartDate() {
    var date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    var startDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const timeConversion = startDate.replace("Z", "");
    return this.conversionStartTime(timeConversion);
  }

  forIntialApigetEndDate() {
    var date = new Date();
    var endDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const timeConversion = endDate.replace("Z", "");
    return this.conversionEndTime(timeConversion);
  }

  historyData() {
    // if (this.parametersCheck) {
     this.isValid = true;
      this.startDate = this.getStartDate();
      this.endDate = this.getEndDate();
      const startDate = this.forIntialApigetStartDate();
      const endDate = this.forIntialApigetEndDate();
      const departmentsRequired = true;
    // }
    const from = '0';
    const perPage = '10';
    const state = '3';
    this.chathistory.chatHistory(from, perPage, state, departmentsRequired, startDate, endDate).subscribe((res: any) => {
      const historyresponse = res.response;
      this.historyDepartment = historyresponse['profiles'];
      this.historyAgent = historyresponse['users'];
      this.chatHistoryData = historyresponse['chats'];
    });
  }

  valueChange(event){
    this.determined = [];
    this.isValid = false;
    const department_$oid = event;
    const getAgentNumbers = this.historyDepartment;
    const agentName = getAgentNumbers.find(id => id._id.$oid === department_$oid);
    
    const agentnameMapping =  agentName.users;
          agentnameMapping.forEach(id => {
    const AgentName = this.historyAgent.find(Agentid => Agentid.id === id);
         return  this.determined.push(AgentName);
   });
   this.determined
    debugger
  }

  updateProfile() { //to intilize the form values this method will used;
    this.historyForm.patchValue({
      startdate: this.getStartDate(),
      enddate: this.getEndDate(),
      selectedStatus: this.radioData[0].value,
      department: this.historyDepartment,
      agent: this.historyAgent,
      searchedData: this.filteredData,
      focusedData: this.focusedData
    });
  }

  getStartDate() {
    var date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    var startDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const timeConversion = startDate.replace("Z", "");
    return this.conversionStartTime(timeConversion);
  }

  getEndDate() {
    var date = new Date();
    var endDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const timeConversion = endDate.replace("Z", "");
    return this.conversionEndTime(timeConversion);
  }

  conversionStartTime(conversion) { //conversion starts start time to get 18:30:00.000
    let str = conversion;
    let timed = "18:30:00.000"
    let result = str.split("T");
    let shift = result.shift().toString();
    // console.log(`${shift}T${timed}`);
    return `${shift}T${timed}`
  }

  conversionEndTime(conversion) {  //conversion starts Endtime into 18:29:00.000
    let str = conversion;
    let timed = "18:29:00.000"
    let result = str.split("T");
    let shift = result.shift().toString();
    // console.log(`${shift}T${timed}`);
    return `${shift}T${timed}`
  }

  searchedData(event: any) {
    this.searchParam = event;
    // console.log(this.searchParam)
    if (this.searchParam === undefined || this.searchParam == "") {
      this.filteredData = [];
    }
    if (this.searchParam != undefined) {
      for (let i = 0; i <= this.searchParam.length; i++) {
        if (i % 2 === 0) {
          this.evenNumber = i
        }
      }
      // debounceTime(500)
      this.chathistory.chatHistoryDropdown(this.searchParam, this.evenNumber).subscribe((res: any) => {
        for (const d of (res['response']['customers'] as any)) {
          this.filteredData.push({
            name: d.name
          });
        }
      });
    }

  }


  onFocusEvent($event) {
    this.userTag = $event.target.value;
    this.chathistory.chatHistoryUserAgent().subscribe((res: any) => {
      const data = res['response']['artifacts'];
      // const mapping = data.map(m => {
      //   return m.data;
      // })
     const mapping = data.map(({ _id, data }) => ({_id, data}));
     debugger
      this.products = mapping;
    })
  }

  agentDepartment(departmentId){
    const departmentName = this.historyDepartment.find(id => id._id.$oid === departmentId);
    return departmentName.name;
  }

  agentName(agentId){
  const agentName = this.historyAgent.find(id => id.id === agentId);
      return agentName.name;
  }
  getState(stateId){
    const stateName = this.chatStatus.find(id => id.value == stateId);
    return stateName.key;
  }


  submit($event) {
    $event.preventDefault();
    // if (this.historyForm.valid) {
    this.urlString = "";
    const obj = new MyObj();
    const formOutput = Object.assign(obj, this.historyForm.value);
    this.parametersCheck = false;
    if (formOutput.startdate !== null && formOutput.startdate !== "") {
      if (formOutput.startdate === this.startDate) {
        this.startDate;
      }
      else {
        const date = new Date(formOutput.startdate - 24 * 60 * 60 * 1000);
        const startDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        const TimeConversion = startDate.replace("Z", "");
        this.startDate = this.conversionStartTime(TimeConversion);
        this.startDate;
      }
    }
    if (formOutput.enddate !== null && formOutput.enddate !== "") {
      if (formOutput.enddate === this.endDate) {
        this.endDate;
      }
      else {
        const date = new Date(formOutput.enddate);
        const endDate = new Date(date.getTime()).toISOString();
        const TimeConversion = endDate.replace("Z", "");
        this.endDate = this.conversionEndTime(TimeConversion);
        this.endDate;
      }
    }
    this.selectedStatus = formOutput.selectedStatus;
    this.department = formOutput.department;
    this.agent = formOutput.agent;
    this.searchedOutput = formOutput.searchedData;
    this.focusedData = formOutput.focusedData;
    debugger
    const UrlBulidingobject = {
      "from": this.from = '0',
      "perPage": this.perPage = '10',
      "state": this.selectedStatus,
      "departmentsRequired": this.departmentsRequired = false,
      "customer": this.searchedOutput,
      "startDate": this.startDate,
      "endDate": this.endDate,
      "agentTag": this.focusedData,
      "department": this.department,
      "agent": this.agent,
    }

    for (var key in UrlBulidingobject) {
      if (UrlBulidingobject[key] === null || UrlBulidingobject[key] === undefined || UrlBulidingobject[key] === "") {
        delete UrlBulidingobject[key];
      }
    }
    const freezing = UrlBulidingobject;
    console.log(freezing);

    var result = Object.keys(freezing).map(function (key) {

      // Using Number() to convert key to number type
      // Using obj[key] to retrieve key value
      return [String(key), freezing[key]];
    });

    // Printing values
    for (var i = 0; i < result.length; i++) {
      for (var z = 0; z < result[i].length; z++) {
        // console.log(result[i][z] + "&"); 
        if (result[i][z] === undefined) {
          return;
        }
        else if (z % 2 === 0) {
          this.urlString += "&" + result[i][z] + "="
        }
        else {
          this.urlString += result[i][z];
        }
      }
    }
    this.finalUrl = this.urlString.replace(undefined || null, "");
    this.getChatHistory(this.finalUrl);
    // this.reset();
    return;
  }

  getChatHistory(finalUrl) {
    // this.chatHistoryData = [];
    this.chathistory.chatHistorygetChats(finalUrl).subscribe((res: any) => {
       const response = res.response;   
        this.chatHistoryData = response['chats'];
    })
  }

  reset() {
    this.myForm.resetForm(); // <-- ici
    this.historyForm.reset();
    // this.updateProfile();
  }
}

class MyObj {
  select: string;
  input: string;
  date: number;
}


 // this.chathistory.chatHistoryUserAgent().subscribe((res:any) =>{
    //   const data = res['response']['artifacts'];
    //   const mapping = data.map(m => {
    //     return m.data;
    //   })
    //   this.products = mapping;
    //   debugger
    //     console.log(this.focusedData);
    // })

// for (var propName in UrlBulidingobject) { 
      //   if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
      //     delete obj[propName];
      //   }
      // }

  // const baseURL = `https://aim.twixor.com/e/enterprise/chat/history?&from=${a}&perPage=${b}&state=${c}&departmentsRequired=${d}&startDate=${e}&endDate=${f}&_=1606295140565`;

  // if(formOutput.startdate === null){
      //    this.startDate = this.getStartDate();
      // }
      // if(formOutput.enddate === null){
      //      this.endDate = this.getEndDate()
      // }

 // this.historyForm = new FormGroup({
    //   customerPhone: new FormControl(null, Validators.required),
    //   startdate: new FormControl(null, Validators.required),
    //   enddate: new FormControl(null, Validators.required),
    //   department: new FormControl(null, Validators.required),
    //   agent: new FormControl(null, Validators.required),
    //   searchedData: new FormControl(null,Validators.required),
    //   focusedData: new FormControl(null,Validators.required)
    // });
    // this.searchedData();

      // for (const d of (res['response']['artifacts'] as any)) {
      //   this.focusedData.push({
      //     name: d.data.desc
      //   });


      // searchedData(){
//   this.filteredOptions = this.historyForm.controls['searchedData'].valueChanges.pipe(
//     startWith(null),
//     debounceTime(0),
//     distinctUntilChanged(),
//     switchMap(val => 
//        this.chathistory.chatHistoryDropdown(val)
//         .pipe(
//         map(response => response['response']['customers'])
//         )
//     )
//     );
// }
// products: any = [
  //   {
  //     tagUnique: "issuenotresolved",
  //     desc: "Issue not resolved"
  //   },
  //   {
  //     tagUnique: "demo",
  //     desc: "Demo"
  //   }
  // ];