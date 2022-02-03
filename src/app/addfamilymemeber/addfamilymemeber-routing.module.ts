import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddfamilymemeberPage } from './addfamilymemeber.page';

const routes: Routes = [
  {
    path: '',
    component: AddfamilymemeberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddfamilymemeberPageRoutingModule {}
