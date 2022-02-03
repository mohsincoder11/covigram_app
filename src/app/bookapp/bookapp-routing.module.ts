import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookappPage } from './bookapp.page';

const routes: Routes = [
  {
    path: '',
    component: BookappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookappPageRoutingModule {}
