import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorforgotPageRoutingModule } from './doctorforgot-routing.module';

import { DoctorforgotPage } from './doctorforgot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorforgotPageRoutingModule
  ],
  declarations: [DoctorforgotPage]
})
export class DoctorforgotPageModule {}
