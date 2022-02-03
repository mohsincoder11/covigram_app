import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayappPageRoutingModule } from './todayapp-routing.module';

import { TodayappPage } from './todayapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayappPageRoutingModule
  ],
  declarations: [TodayappPage]
})
export class TodayappPageModule {}
