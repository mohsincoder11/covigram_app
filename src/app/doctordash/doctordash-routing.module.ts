import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctordashPage } from './doctordash.page';

const routes: Routes = [
  {
    path: '',
    component: DoctordashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctordashPageRoutingModule {}
