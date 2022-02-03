import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todayapp',
  templateUrl: './todayapp.page.html',
  styleUrls: ['./todayapp.page.scss'],
})
export class TodayappPage implements OnInit {

  switchTab = 'upcoming'

  segmentChanged(ev: any) {
    this.switchTab = ev.detail.value;
    console.log('Segment changed', ev);
  }
  constructor() { }



  ngOnInit() {
  }

}



