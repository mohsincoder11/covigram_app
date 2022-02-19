import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewtodayreportPageRoutingModule } from './viewtodayreport-routing.module';

import { ViewtodayreportPage } from './viewtodayreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewtodayreportPageRoutingModule
  ],
  declarations: [ViewtodayreportPage]
})
export class ViewtodayreportPageModule {}
