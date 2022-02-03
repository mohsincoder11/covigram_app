import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmemberprofilePageRoutingModule } from './editmemberprofile-routing.module';

import { EditmemberprofilePage } from './editmemberprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditmemberprofilePageRoutingModule
  ],
  declarations: [EditmemberprofilePage]
})
export class EditmemberprofilePageModule {}
