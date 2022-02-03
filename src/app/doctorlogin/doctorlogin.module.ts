import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorloginPageRoutingModule } from './doctorlogin-routing.module';

import { DoctorloginPage } from './doctorlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorloginPageRoutingModule
  ],
  declarations: [DoctorloginPage]
})
export class DoctorloginPageModule {}
