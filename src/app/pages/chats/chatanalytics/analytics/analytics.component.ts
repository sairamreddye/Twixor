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
  analyticsForm = this.fb.group({
    department: [''],
    agent: [''],
    startdate: ['',Validators.required],
    enddate: ['',Validators.required]
  });
  chatAttended: any = "00";
  missedChat: any = "00";
  avgPickedUpInterval: any = "0";
  // survey = new Array<MyObj>();
  // group: FormGroup;
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
  dashBoardData: any = [];
  newAgentDropdown: any[];
  isValid: boolean;
  urlString: string;
  endDate: string;
  finalUrl: string;

  constructor(private analytics: AnalyitcsService, private datePipe: DatePipe, private fb: FormBuilder) { }

  ngOnInit() {
    this.analyticsData();
    this.updateProfile();
    // this.Last7Days();
  }
  updateProfile() { //todo intilize the form values in this method
    this.analyticsForm.patchValue({
      department: this.analyticDepartment,
      agent: this.analyticAgent,
      startdate: this.Last7Days(),
      enddate: this.formatDate()
    });
  }

  forIntialApigetStartDate() {
    var MyDate = new Date();
    var MyDateString;
    MyDate.setDate(MyDate.getDate() - 6);
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
    return MyDateString;
  }

  forIntialApigetEndDate(){
    let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
  }

  analyticsData() {
    this.startDate = this.Last7Days();
    this.endDate = this.formatDate();
    this.isValid = true;
    const startDate = this.forIntialApigetStartDate();
    const enddate = this.forIntialApigetEndDate();
    const agent = 0;
    const department = '';
    const departmentsRequired = true;
    const clientOffset = -330;
    const timeType = 'DAY';
    const currentDate = this.forIntialApigetStartDate();
    this.analytics.analytics(startDate, enddate, clientOffset, timeType, currentDate, department, agent, departmentsRequired).subscribe((res: any) => {
      const analyticResponse = res.response;
      if (analyticResponse) {
        this.chatAttended = this.zeroAdd(analyticResponse['noOfAttendedChats']) !== undefined ? this.zeroAdd(analyticResponse['noOfAttendedChats']) : "00";
        this.missedChat = this.zeroAdd(analyticResponse['noOfMissedChats']) !== undefined ? this.zeroAdd(analyticResponse['noOfMissedChats']) : "00";
        this.avgPickedUpInterval = this.getDuration(analyticResponse['avgPickedUpInterval']) !== undefined ? this.getDuration(analyticResponse['avgPickedUpInterval']) : "00";
        this.analyticDepartment = analyticResponse['profiles'];
        this.analyticAgent = analyticResponse['users'];
        this.dashBoardData = analyticResponse['dashBoardData']; //todo reshma want to do task
      }
    });
  }

  valueChange(event) { //todo method when department will change agent dropdown will changed
    this.newAgentDropdown = [];
    this.isValid = false;
    const department_$oid = event;
    const getAgentNumbers = this.analyticDepartment;
    const agentName = getAgentNumbers.find(id => id._id.$oid === department_$oid);

    const agentnameMapping = agentName.users;
    agentnameMapping.forEach(id => {
      const AgentName = this.analyticAgent.find(Agentid => Agentid.id === id);
      return this.newAgentDropdown.push(AgentName);
    });
    this.newAgentDropdown
  }


  submit($event) {
    $event.preventDefault();
    this.urlString = "";
    const obj = new MyObj();
    const formOutput = Object.assign(obj, this.analyticsForm.value);
    if (formOutput.startdate !== null && formOutput.startdate !== "") {
      if (formOutput.startdate === this.startDate) {
        this.startDate;
      }
      else {
        var MyDate = new Date(formOutput.startdate);
        var MyDateString;
        MyDate.setDate(MyDate.getDate() - 6);
        MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
        this.startDate = MyDateString;
        this.startDate;
      }
    }

    if (formOutput.enddate !== null && formOutput.enddate !== "") {
      if (formOutput.enddate === this.endDate) {
        this.endDate;
      }
      else {
        let d = new Date(formOutput.enddate),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        const userselectedDate = [year, month, day].join('-');
        this.endDate = userselectedDate;
      }
    }
      if (formOutput.department === undefined) {
        this.department = "";
      }
      else{
        this.department = formOutput.department;
      }
      if (formOutput.agent === undefined) {
        this.agent = "0";
      }
      else{
        this.agent = formOutput.agent;
      }
    

    const UrlBulidingobject = {
      "formDate": `${this.startDate}T00%3A00%3A00.000`,
      "toDate": `${this.endDate}T23%3A59%3A00.000`,
      "clientOffset": -330,
      "timeType": "DAY",
      "currentDate": this.formatDate(),
      "department": this.department,
      "agent": this.agent,
      "departmentsRequired": false
    }
    // for (var key in UrlBulidingobject) {
    //   if (UrlBulidingobject[key] === null || UrlBulidingobject[key] === undefined || UrlBulidingobject[key] === "") {
    //     delete UrlBulidingobject[key];
    //   }
    // }
    const freezing = UrlBulidingobject;
    var result = Object.keys(freezing).map(function (key) {
      return [String(key), freezing[key]];
    });
    for (var i = 0; i < result.length; i++) {
      for (var z = 0; z < result[i].length; z++) {
        // if (result[i][z] === undefined) {
        //   return;
        // }
         if (z % 2 === 0) {
          this.urlString += "&" + result[i][z] + "="
        }
        else {
          this.urlString += result[i][z];
        }
      }
    }
    const Url = this.urlString.replace(/undefined/g, "");
    this.finalUrl = Url.replace("&","");
    this.getDataonSubmission(this.finalUrl);
    return;
  }

  getDataonSubmission(finalUrl) { //todo method after pressing the getReports
    this.dashBoardData = [];
    this.analytics.analyticsFormsubmission(finalUrl).subscribe((res: any) => {
      const response = res.response;
      this.dashBoardData = response['dashBoardData'];
    })
  }

  reset() {
    this.myForm.resetForm(); // <-- ici
    this.analyticsForm.reset();
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
    var MyDate = new Date();
    var MyDateString;
    MyDate.setDate(MyDate.getDate() - 6);
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
    return MyDateString;
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