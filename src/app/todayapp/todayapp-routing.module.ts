import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayappPage } from './todayapp.page';

const routes: Routes = [
  {
    path: '',
    component: TodayappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayappPageRoutingModule {}
