import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilymemberPage } from './familymember.page';

const routes: Routes = [
  {
    path: '',
    component: FamilymemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilymemberPageRoutingModule {}
