import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadreportPage } from './uploadreport.page';

const routes: Routes = [
  {
    path: '',
    component: UploadreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadreportPageRoutingModule {}
