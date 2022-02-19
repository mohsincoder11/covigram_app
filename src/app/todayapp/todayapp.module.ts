import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodayappPageRoutingModule } from './todayapp-routing.module';
import { TodayappPage } from './todayapp.page';
import { FooterdoctorPageModule } from '../footerdoctor/footerdoctor.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayappPageRoutingModule,
    FooterdoctorPageModule,
    Ng2SearchPipeModule
  ],
  declarations: [TodayappPage]
})
export class TodayappPageModule { }
