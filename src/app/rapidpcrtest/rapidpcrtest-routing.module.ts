import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RapidpcrtestPage } from './rapidpcrtest.page';

const routes: Routes = [
  {
    path: '',
    component: RapidpcrtestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RapidpcrtestPageRoutingModule {}
