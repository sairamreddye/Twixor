import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalyitcsService } from 'src/app/providers/analyitcs.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  providers: [
    DatePipe
  ]
})

export class AnalyticsComponent implements OnInit {
  @ViewChild('f', { static: false }) myForm;

  chatAttended: any ="00";
  missedChat: any = "00";
  avgPickedUpInterval: any = "0";
  survey = new Array<MyObj>();
  group: FormGroup;
  // analyticDepartment = [
  //   { name: 'asscoiate', id: 0 },
  //   { name: 'trainee', id: 1 }
  // ];
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
  dashBoardData: any;

  constructor(private analytics: AnalyitcsService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.analyticsData();
    this.group = new FormGroup({
      department: new FormControl(null, Validators.required),
      agent: new FormControl(null, Validators.required),
      startdate: new FormControl(null, Validators.required),
      enddate: new FormControl(null, Validators.required)
    });
    this.Last7Days();
  }

  analyticsData() {
    if (this.parametersCheck) {
      this.startDate = this.Last7Days();
      this.enddate = this.formatDate();
      this.agent = 0;
      this.department = '';
      this.departmentsRequired = true;
    }
    this.clientOffset = -330;
    this.timeType = 'DAY';
    this.currentDate = this.formatDate();
    this.analytics.analytics(this.startDate, this.enddate, this.clientOffset, this.timeType, this.currentDate, this.department,this.agent, this.departmentsRequired).subscribe((res: any) => {
    const analyticResponse = res.response;
    debugger
    this.chatAttended = this.zeroAdd(analyticResponse['noOfAttendedChats']) !== undefined ? this.zeroAdd(analyticResponse['noOfAttendedChats']) : "00";
    this.missedChat = this.zeroAdd(analyticResponse['noOfMissedChats']) !== undefined ? this.zeroAdd(analyticResponse['noOfMissedChats']) : "00";
    this.avgPickedUpInterval = this.getDuration(analyticResponse['avgPickedUpInterval']) !== undefined ? this.getDuration(analyticResponse['avgPickedUpInterval']) : "00";
    this.analyticDepartment = analyticResponse['profiles'];
    this.analyticAgent = analyticResponse['users'];
    this.dashBoardData = analyticResponse['dashBoardData']; //todo reshma want to do task
    });
  }

  submit($event) {
    $event.preventDefault();
    if (this.group.valid) {
      const obj = new MyObj();
      Object.assign(obj, this.group.value);
      this.survey.push(obj);
      this.parametersCheck = false;
      this.department = this.group.controls['department'].value;
      this.agent = this.group.controls['agent'].value;
      debugger
      this.departmentsRequired = false;
      this.startDate = this.datePipe.transform(this.group.controls['startdate'].value, "yyyy-MM-dd");
      if (this.datePipe.transform(this.group.controls['enddate'].value, "yyyy-MM-dd") <= this.formatDate()) {
        this.enddate = this.datePipe.transform(this.group.controls['enddate'].value, "yyyy-MM-dd");
      }
      else {
        this.enddate = this.formatDate();
      }
      //  if(this.department === this.agent){  //TOdo comparision department and agent
      //     this.departmentAgent = 0
      //  }
      this.analyticsData();
      this.reset();
      return;
    }
    else if (!this.group.valid) {
      this.parametersCheck = false;
      this.department = this.group.controls['department'].value;
      this.agent = this.group.controls['agent'].value;
      //  if(this.department === this.agent){  //TOdo comparision department and agent
      //     this.departmentAgent = 0
      //  }
      this.startDate = this.Last7Days();
      this.enddate = this.formatDate();
      this.analyticsData();
      this.reset();
      return;
    }
    else {
      alert('not valid, try again');
    }
  }

  reset() {
    this.myForm.resetForm(); // <-- ici
    this.group.reset();
  }


  zeroAdd(parameter) {
    const zeroAppend = parameter <= 9 ? "0" + parameter : parameter;
    return zeroAppend;
  }

  getDuration(milli) {
    let minutes = Math.floor(milli / 60000);
    let seconds: any = ((milli % 60000) / 1000).toFixed(0);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    return (
      (days && { value: days, unit: 'days' }) ||
      (hours && { value: hours, unit: 'hours' }) ||
      (seconds && { value: minutes + ":" + (seconds < 10 ? '0' : '') + seconds, unit: 'sec' }) ||
      { value: minutes, unit: 'minutes' }
    )
  }

  Last7Days() {
    let date = new Date();
    date.setDate(date.getDate() - 6);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  formatDate() {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
class MyObj {
  select: string;
  input: string;
  date: number;
}


// fillForm(selection) {
  //   this.group.reset({
  //     department: selection.department,
  //     agent: selection.agent,
  //     startdate: selection.startdate,
  //     enddate: selection.enddate
  //   });
  // }

  // constructor() {
  //   this.date = Date.now();
  // }


// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
//   MAT_DATE_LOCALE
// } from "@angular/material/core";


 // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE]
    // },

    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

// startdate = new FormControl(moment());
  // enddate = new FormControl(moment());

  // StartDepartment = new FormControl('', [Validators.required]);
  // EndDepartment = new FormControl('', [Validators.required]);

  // Department(){
//   this.testSubscription = this.StartDepartment.valueChanges
//       // .pipe(debounceTime(100))
//       .subscribe(value => console.log(value));
// }

// Agent(){
//   this.testSubscription = this.EndDepartment.valueChanges
//       // .pipe(debounceTime(100))
//       .subscribe(value => console.log(value));
// }

// dateValue() {
//   console.log(this.datePipe.transform(this.startdate.value, "yyyy-MM-dd"));
// }
// date2Value(){
//      console.log(this.datePipe.transform(this.enddate.value, "yyyy-MM-dd"));
// }

// createForm() {
  //   this.analyitcsForm = this.formBuilder.group({
  //     // 'email': ['', Validators.required],
  //     // 'password': ['', Validators.required],
  //     'startdate': ['',moment(),Validators.required],
  //     'enddate': [moment(),Validators.required],
  //     'StartDepartment': ['',Validators.required],
  //     'EndDepartment': ['',Validators.required],
  //   });
  // }


  // console.log(this.survey);
      // console.log(
      //   this.group.controls['department'].value+"="
      //   +this.group.controls['agent'].value+"="+
      //   this.datePipe.transform(this.group.controls['startdate'].value, "yyyy-MM-dd")+"="+
      //   this.datePipe.transform(this.group.controls['enddate'].value, "yyyy-MM-dd")
      //   );

      // import * as _moment from "moment";
// import * as _rollupMoment  from "moment";
// import { validateVerticalPosition } from '@angular/cdk/overlay';

// const moment = _rollupMoment || _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: "LL"
//   },
//   display: {
//     dateInput: "MM-DD-YYYY",
//     monthYearLabel: "YYYY",
//     dateA11yLabel: "LL",
//     monthYearA11yLabel: "YYYY"
//   }
// };

  // else if(this.group.valid && this.enddate <= this.formatDate()){
    //   this.parametersCheck = false;
    //   alert("Date should be alaways be equal or lessthan todays date");
    //     this.enddate = this.formatDate();
    //     this.startDate;
    //     this.analyticsData();
    //     this.reset();
    // }