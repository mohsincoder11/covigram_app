import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdoctorprofilePageRoutingModule } from './editdoctorprofile-routing.module';

import { EditdoctorprofilePage } from './editdoctorprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdoctorprofilePageRoutingModule
  ],
  declarations: [EditdoctorprofilePage]
})
export class EditdoctorprofilePageModule {}
