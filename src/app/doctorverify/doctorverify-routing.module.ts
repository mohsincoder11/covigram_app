import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorverifyPage } from './doctorverify.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorverifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorverifyPageRoutingModule {}
