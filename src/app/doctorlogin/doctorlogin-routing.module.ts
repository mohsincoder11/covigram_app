import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorloginPage } from './doctorlogin.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorloginPageRoutingModule {}
