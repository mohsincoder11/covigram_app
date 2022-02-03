import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorforgotPage } from './doctorforgot.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorforgotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorforgotPageRoutingModule {}
