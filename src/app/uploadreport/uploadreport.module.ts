import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadreportPageRoutingModule } from './uploadreport-routing.module';

import { UploadreportPage } from './uploadreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadreportPageRoutingModule
  ],
  declarations: [UploadreportPage]
})
export class UploadreportPageModule {}
