import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitreportPage } from './submitreport.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitreportPageRoutingModule {}
