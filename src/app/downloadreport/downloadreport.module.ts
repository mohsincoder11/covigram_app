import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadreportPageRoutingModule } from './downloadreport-routing.module';

import { DownloadreportPage } from './downloadreport.page';

import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadreportPageRoutingModule,
    FooterPageModule
  ],
  declarations: [DownloadreportPage]
})
export class DownloadreportPageModule { }
