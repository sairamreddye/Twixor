import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEncapsComponent } from './create-encaps/create-encaps.component';


const routes: Routes = [
  {path:"", component:CreateEncapsComponent},
  {path:"createencaps", component:CreateEncapsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateencapsRoutingModule { }
