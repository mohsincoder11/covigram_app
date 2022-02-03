import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportformPageRoutingModule } from './reportform-routing.module';

import { ReportformPage } from './reportform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportformPageRoutingModule
  ],
  declarations: [ReportformPage]
})
export class ReportformPageModule {}
