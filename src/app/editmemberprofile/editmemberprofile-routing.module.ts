import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditmemberprofilePage } from './editmemberprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditmemberprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditmemberprofilePageRoutingModule {}
