import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpdoctorPage } from './otpdoctor.page';

const routes: Routes = [
  {
    path: '',
    component: OtpdoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpdoctorPageRoutingModule {}
