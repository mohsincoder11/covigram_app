import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterdoctorPage } from './footerdoctor.page';

const routes: Routes = [
  {
    path: '',
    component: FooterdoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterdoctorPageRoutingModule {}
