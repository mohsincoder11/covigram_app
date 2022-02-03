import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddfamilymemeberPageRoutingModule } from './addfamilymemeber-routing.module';

import { AddfamilymemeberPage } from './addfamilymemeber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddfamilymemeberPageRoutingModule
  ],
  declarations: [AddfamilymemeberPage]
})
export class AddfamilymemeberPageModule {}
