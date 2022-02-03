import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateaccdoctorPageRoutingModule } from './createaccdoctor-routing.module';

import { CreateaccdoctorPage } from './createaccdoctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateaccdoctorPageRoutingModule
  ],
  declarations: [CreateaccdoctorPage]
})
export class CreateaccdoctorPageModule {}
