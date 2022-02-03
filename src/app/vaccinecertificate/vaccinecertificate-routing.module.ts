import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinecertificatePage } from './vaccinecertificate.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinecertificatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinecertificatePageRoutingModule {}
