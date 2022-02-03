import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilymemberPageRoutingModule } from './familymember-routing.module';

import { FamilymemberPage } from './familymember.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilymemberPageRoutingModule
  ],
  declarations: [FamilymemberPage]
})
export class FamilymemberPageModule {}
