import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalreportPageRoutingModule } from './medicalreport-routing.module';

import { MedicalreportPage } from './medicalreport.page';

import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalreportPageRoutingModule,
    FooterPageModule
  ],
  declarations: [MedicalreportPage]
})
export class MedicalreportPageModule { }
