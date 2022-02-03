import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorverifyPageRoutingModule } from './doctorverify-routing.module';

import { DoctorverifyPage } from './doctorverify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorverifyPageRoutingModule
  ],
  declarations: [DoctorverifyPage]
})
export class DoctorverifyPageModule {}
