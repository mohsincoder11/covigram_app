import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinecertificatePageRoutingModule } from './vaccinecertificate-routing.module';

import { VaccinecertificatePage } from './vaccinecertificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinecertificatePageRoutingModule
  ],
  declarations: [VaccinecertificatePage]
})
export class VaccinecertificatePageModule {}
