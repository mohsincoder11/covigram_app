import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalregisterPage } from './totalregister.page';

const routes: Routes = [
  {
    path: '',
    component: TotalregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalregisterPageRoutingModule {}
