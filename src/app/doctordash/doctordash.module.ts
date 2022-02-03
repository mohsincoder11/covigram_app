import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctordashPageRoutingModule } from './doctordash-routing.module';

import { DoctordashPage } from './doctordash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctordashPageRoutingModule
  ],
  declarations: [DoctordashPage]
})
export class DoctordashPageModule {}
