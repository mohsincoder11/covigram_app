import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitreportPageRoutingModule } from './submitreport-routing.module';

import { SubmitreportPage } from './submitreport.page';

import { FooterPageModule } from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitreportPageRoutingModule,
    FooterPageModule
  ],
  declarations: [SubmitreportPage]
})
export class SubmitreportPageModule { }
