import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadfilePage } from './downloadfile.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadfilePageRoutingModule {}
