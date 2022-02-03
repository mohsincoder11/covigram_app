import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookappPageRoutingModule } from './bookapp-routing.module';
import { BookappPage } from './bookapp.page';
import { CalModalPageModule } from '../pages/cal-modal/cal-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookappPageRoutingModule,
    CalModalPageModule
  ],
  declarations: [BookappPage]
})
export class BookappPageModule { }
