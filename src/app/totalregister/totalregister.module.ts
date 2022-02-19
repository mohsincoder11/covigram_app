import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TotalregisterPageRoutingModule } from './totalregister-routing.module';
import { TotalregisterPage } from './totalregister.page';
import { FooterdoctorPageModule } from '../footerdoctor/footerdoctor.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalregisterPageRoutingModule,
    FooterdoctorPageModule,
    Ng2SearchPipeModule
  ],
  declarations: [TotalregisterPage]
})
export class TotalregisterPageModule { }
