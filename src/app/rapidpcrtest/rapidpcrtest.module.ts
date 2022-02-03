import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RapidpcrtestPageRoutingModule } from './rapidpcrtest-routing.module';

import { RapidpcrtestPage } from './rapidpcrtest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RapidpcrtestPageRoutingModule
  ],
  declarations: [RapidpcrtestPage]
})
export class RapidpcrtestPageModule {}
