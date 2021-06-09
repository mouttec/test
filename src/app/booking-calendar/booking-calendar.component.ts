import { Component, OnInit } from '@angular/core';
import { CalendarBookingService } from '../services/calendar-booking.service';
import { BookingCalendar } from 'src/app/models/bookingCalendar.model';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css']
})
export class BookingCalendarComponent implements OnInit {
  idAgency = 1;
  date: any[] = new Array();
  hours: any[] = new Array();
  data: any;
  dateKeys: any;

  constructor(private calendarBooking: CalendarBookingService) { }

  ngOnInit(): void {
    this.getBooking();
  }

  // getBooking() {
  //   const newBooking = new BookingCalendar;
  //   newBooking.idAgency = this.idAgency;
  //   return this.calendarBooking.readBooking(newBooking).then((data) => {
  //     this.data = data.data;
  //     this.date = Object.keys(data.data);
  //     const f = this.date.forEach( function(day) {
  //       const hours = Object.keys(day);
  //       return hours;
  //     })
  //     console.log('data',this.data);
  //     console.log('day', this.date);
  //     console.log('hours', this.hours);
  //     return data;
  //   })
  // }

  // getBooking() {
  //   const newBooking = new BookingCalendar;
  //   newBooking.idAgency = this.idAgency;
  //   return this.calendarBooking.read().subscribe(
  //     (reponse) => {
  //       this.data = reponse;
  //       const dateKeys = Object.keys(this.data);
  //       for (let i = 0; i < dateKeys.length; ++i) {
  //         const dayStr: any = dateKeys[i];
  //         this.date.push(dayStr);
  //         const hourKeys = Object.keys(this.data[dayStr]);
  //         for (let j = 0; j < hourKeys.length; ++j) {
  //           const hourStr: any = hourKeys[j];
  //           console.log('hour', hourKeys[j], 'value', this.data[dayStr][hourStr]);
  //     }}}
  //   )
  // }

  // getBooking() {
  //   const newBooking = new BookingCalendar;
  //   newBooking.idAgency = this.idAgency;
  //   return this.calendarBooking.read(newBooking).subscribe(
  //     (reponse) => {
  //     this.data = reponse;
  //     Object.entries(this.data).forEach(([key, value]) => {
  //       this.date = key;
  //       console.log(' ****  date=', key);
  //       Object.entries(value).forEach(([key2, value2]) => {
  //       // console.log('hour=', key2, 'value=', value2);
  //       });
  //     });
  //   });
  // }

  getBooking() {
    this.data = this.calendarBooking.read();
    console.log(this.data);
    const dateKeys = Object.keys(this.data);
          for (let i = 0; i < dateKeys.length; ++i) {
            const dayStr: any = dateKeys[i];
            this.date.push(dayStr);
            const hourKeys = Object.keys(this.data[dayStr]);
            for (let j = 0; j < hourKeys.length; ++j) {
              const hourStr: any = hourKeys[j];
              this.hours.push(hourStr);
              if(this.data[dayStr][hourStr] === 3) {
                this.hours.slice(hourStr)
              }
              console.log(this.hours);
              console.log('hour', hourKeys[j], 'value', this.data[dayStr][hourStr]);
            }
    }
  }
}
