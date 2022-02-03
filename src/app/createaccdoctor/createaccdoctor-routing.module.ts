import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateaccdoctorPage } from './createaccdoctor.page';

const routes: Routes = [
  {
    path: '',
    component: CreateaccdoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateaccdoctorPageRoutingModule {}
