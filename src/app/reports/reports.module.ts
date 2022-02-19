import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReportsPageRoutingModule } from './reports-routing.module';
import { ReportsPage } from './reports.page';
import { FooterdoctorPageModule } from '../footerdoctor/footerdoctor.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    FooterdoctorPageModule,
    Ng2SearchPipeModule
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule { }
