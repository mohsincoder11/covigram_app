import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadfilePageRoutingModule } from './downloadfile-routing.module';

import { DownloadfilePage } from './downloadfile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadfilePageRoutingModule
  ],
  declarations: [DownloadfilePage]
})
export class DownloadfilePageModule {}
