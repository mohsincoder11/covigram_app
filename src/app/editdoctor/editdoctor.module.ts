import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdoctorPageRoutingModule } from './editdoctor-routing.module';

import { EditdoctorPage } from './editdoctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdoctorPageRoutingModule
  ],
  declarations: [EditdoctorPage]
})
export class EditdoctorPageModule {}
