import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-doctordash',
  templateUrl: './doctordash.page.html',
  styleUrls: ['./doctordash.page.scss'],
})
export class DoctordashPage implements OnInit {

  slider: any;
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,

  };

  constructor() { }

  slideChanged() {
    this.slider.stopAutoplay(); //this code for slide after page change
  }

  ngOnInit() {
  }

}
