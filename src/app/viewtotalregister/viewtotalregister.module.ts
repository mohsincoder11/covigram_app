import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewtotalregisterPageRoutingModule } from './viewtotalregister-routing.module';

import { ViewtotalregisterPage } from './viewtotalregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewtotalregisterPageRoutingModule
  ],
  declarations: [ViewtotalregisterPage]
})
export class ViewtotalregisterPageModule {}
