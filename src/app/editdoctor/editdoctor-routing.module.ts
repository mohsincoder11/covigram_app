import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdoctorPage } from './editdoctor.page';

const routes: Routes = [
  {
    path: '',
    component: EditdoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdoctorPageRoutingModule {}
