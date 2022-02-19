import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewtotalregisterPage } from './viewtotalregister.page';

const routes: Routes = [
  {
    path: '',
    component: ViewtotalregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewtotalregisterPageRoutingModule {}
