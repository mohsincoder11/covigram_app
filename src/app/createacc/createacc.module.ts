import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateaccPageRoutingModule } from './createacc-routing.module';

import { CreateaccPage } from './createacc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateaccPageRoutingModule
  ],
  declarations: [CreateaccPage]
})
export class CreateaccPageModule {}
