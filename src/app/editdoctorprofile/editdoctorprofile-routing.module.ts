import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdoctorprofilePage } from './editdoctorprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditdoctorprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdoctorprofilePageRoutingModule {}
