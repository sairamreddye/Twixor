import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JourneyComponent } from './journey/journey.component';


const routes: Routes = [
  
  {
    path: "",
      component: JourneyComponent
    },
    {
  path: "journey",
    component: JourneyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyRoutingModule { }
