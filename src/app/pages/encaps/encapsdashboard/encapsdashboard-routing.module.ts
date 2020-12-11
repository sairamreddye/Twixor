import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncapsComponent } from './encaps/encaps.component';


const routes: Routes = [
  {
    path:"",
    component:EncapsComponent
  },
  {
    path:"dashboard",
    component:EncapsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncapsdashboardRoutingModule { }
