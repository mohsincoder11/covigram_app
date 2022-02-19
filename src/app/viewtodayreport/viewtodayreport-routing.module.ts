import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewtodayreportPage } from './viewtodayreport.page';

const routes: Routes = [
  {
    path: '',
    component: ViewtodayreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewtodayreportPageRoutingModule {}
