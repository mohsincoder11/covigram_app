import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bookapp',
  templateUrl: './bookapp.page.html',
  styleUrls: ['./bookapp.page.scss'],
})
export class BookappPage implements OnInit {
  eventSource = [];
  viewTitle: string;
  date: string;
  type: 'string';
  appointment_date;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  selectedDate: Date;

  //  @ViewChild{CalendarComponent} myCal: CalendarComponent; 
  constructor() { }

  ngOnInit() {
  }

}
