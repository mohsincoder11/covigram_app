import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpdoctorPageRoutingModule } from './otpdoctor-routing.module';

import { OtpdoctorPage } from './otpdoctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpdoctorPageRoutingModule
  ],
  declarations: [OtpdoctorPage]
})
export class OtpdoctorPageModule {}
