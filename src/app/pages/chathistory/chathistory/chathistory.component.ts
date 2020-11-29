import { Component, OnInit, ViewChild } from '@angular/core';
import { ChathistoryService } from '../../../providers/chathistory.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
import { catchError, map, tap, startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.scss']
})
export class ChathistoryComponent implements OnInit {
  @ViewChild('f', { static: false }) myForm;
  historyForm: FormGroup;
  startDate: string;
  enddate: any;
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
  // filteredOptions:any [];
  // myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  searchParam: any;
  filteredData: any;
  from: any;
  perPage: string;
  state: string;
  historyDepartment: any;
  historyAgent: any;
  searchedOutput: any;
  userTag: any;
  focusedData: any;
  
  constructor(private chathistory:ChathistoryService) { }

  ngOnInit() {
    this.historyData();
    this.historyForm = new FormGroup({
      // customerPhone: new FormControl(null, Validators.required),
      startdate: new FormControl(null, Validators.required),
      enddate: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      agent: new FormControl(null, Validators.required),
      searchedData: new FormControl(null,Validators.required),
      focusedData: new FormControl(null,Validators.required)
    });
    // this.searchedData();
  }


   searchedData(event: any) {
    this.searchParam = event;
    console.log(this.searchParam)
    if(this.searchParam === undefined || this.searchParam == ""){
      this.filteredData = [];
    }
    if(this.searchParam != undefined){
      for(let i=0; i<=this.searchParam.length;i++){
        if(i % 2 === 0) {
          this.evenNumber = i
        }
      }
      debounceTime(500)
      this.chathistory.chatHistoryDropdown(this.searchParam,this.evenNumber).subscribe((res:any) => {
        for (const d of (res['response']['customers'] as any)) {
          this.filteredData.push({
            name: d.name
          });
          console.log(this.filteredData);
        }
        // this.filteredData = res['response']['customers'];
        
      });
    }
      
  }
  onFocusEvent($event){
    this.userTag = $event.target.value;
    this.chathistory.chatHistoryUserAgent().subscribe((res:any) =>{
      // for (const d of (res['response']['artifacts'] as any)) {
      //   this.focusedData.push({
      //     name: d.data.desc
      //   });
      const data = res['response']['artifacts'];
      debugger
      this.focusedData = data;
        console.log(this.focusedData);
      // }
    })
  }
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

  historyData(){
    if (this.parametersCheck) {
      this.startDate = this.getStartDate();
      this.enddate = this.getEndDate();
      this.departmentsRequired = true;
    }
    this.from = '0';
    this.perPage = '10';
    this.state = '3'
    this.chathistory.chatHistory(this.from,this.perPage,this.state,this.departmentsRequired,this.startDate,this.enddate).subscribe((res:any) => {
    const historyresponse = res.response;    
    this.historyDepartment = historyresponse['profiles'];
    this.historyAgent = historyresponse['users'];
    });
  }

  getStartDate() {
    var date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    var startDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return startDate.replace("Z", "");
  }

  getEndDate() {
    var date = new Date();
    var endDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return endDate.replace("Z", "");
  }

  submit($event) {
    $event.preventDefault();
    // if (this.historyForm.valid) {
      const obj = new MyObj();
      const formOutput =  Object.assign(obj, this.historyForm.value);
      if(formOutput.startdate !== null){
        const date = new Date(formOutput.startdate - 24 * 60 * 60 * 1000);
        const startDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        this.startDate = startDate.replace("Z", "");
      }
      if(formOutput.enddate !== null){
        const date = new Date(formOutput.enddate);
        const endDate = new Date(date.getTime()).toISOString();
        this.enddate = endDate.replace("Z", "");
      }
      this.department = formOutput.department;
      this.agent = formOutput.agent;
      this.searchedOutput = formOutput.searchedData
      debugger;
      for (var propName in formOutput) { 
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      // this.survey.push(obj);
      // this.parametersCheck = false;
      // this.department = this.group.controls['department'].value;
      // this.agent = this.group.controls['agent'].value;
      // debugger
      // this.departmentsRequired = false;
      // this.startDate = this.datePipe.transform(this.group.controls['startdate'].value, "yyyy-MM-dd");
      // if (this.datePipe.transform(this.group.controls['enddate'].value, "yyyy-MM-dd") <= this.formatDate()) {
      //   this.enddate = this.datePipe.transform(this.group.controls['enddate'].value, "yyyy-MM-dd");
      // }
      // else {
      //   this.enddate = this.formatDate();
      // }
      //  if(this.department === this.agent){  //TOdo comparision department and agent
      //     this.departmentAgent = 0
      //  }
      // this.historyData();
      this.reset();
      return;
    // }
    // else if (!this.historyForm.valid) {
      // this.parametersCheck = false;
      // this.department = this.group.controls['department'].value;
      // this.agent = this.group.controls['agent'].value;
      //  if(this.department === this.agent){  //TOdo comparision department and agent
      //     this.departmentAgent = 0
      //  }
      // this.startDate = this.Last7Days();
      // this.enddate = this.formatDate();
      // this.analyticsData();
      // this.reset();
      // return;
    // }
    // else {
    //   alert('not valid, try again');
    // }
  }

  reset() {
    this.myForm.resetForm(); // <-- ici
    this.historyForm.reset();
  }

}

class MyObj {
  select: string;
  input: string;
  date: number;
}