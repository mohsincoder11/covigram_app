import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AntibodytestPageRoutingModule } from './antibodytest-routing.module';

import { AntibodytestPage } from './antibodytest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntibodytestPageRoutingModule
  ],
  declarations: [AntibodytestPage]
})
export class AntibodytestPageModule {}
