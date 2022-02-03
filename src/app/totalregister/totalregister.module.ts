import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalregisterPageRoutingModule } from './totalregister-routing.module';

import { TotalregisterPage } from './totalregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalregisterPageRoutingModule
  ],
  declarations: [TotalregisterPage]
})
export class TotalregisterPageModule {}
