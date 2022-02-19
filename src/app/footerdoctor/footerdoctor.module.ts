import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterdoctorPageRoutingModule } from './footerdoctor-routing.module';

import { FooterdoctorPage } from './footerdoctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterdoctorPageRoutingModule
  ],
  declarations: [FooterdoctorPage],
  exports: [FooterdoctorPage]
})
export class FooterdoctorPageModule { }
