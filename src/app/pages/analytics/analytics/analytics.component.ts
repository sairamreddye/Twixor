import { Component, OnInit } from '@angular/core';
import { AnalyitcsService } from 'src/app/providers/analyitcs.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(private analytics:AnalyitcsService) { }

  ngOnInit() {
    this.analytics.analytics().subscribe((res:any) => {
      console.log(res);
    })
  }

}
