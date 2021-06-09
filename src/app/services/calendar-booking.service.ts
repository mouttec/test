import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarBookingService {

  resa =  {
    '2021-06-07': {
      1: '07:30',
      2: '08:30',
      3: '09:30',
      4: '10:30',
      5: '11:30',
      6: '13:30',
      7: '14:30',
      8: '15:30',
      9: '16:30',
      10: '17:30',
      11: '18:30',
      12: '19:30'
    },
    '2021-06-08': {
      '07:30': 1,
      '08:30': 2,
      '09:30': 3,
      '10:30': 4,
      '11:30': 5,
      '13:30': 6,
      '14:30': 7,
      '15:30': 8,
      '16:30': 9,
      '17:30': 10,
      '18:30': 11,
      '19:30': 12
    },
    '2021-06-09': {
      '07:30': 1,
      '08:30': 2,
      '09:30': 3,
      '10:30': 4,
      '11:30': 5,
      '13:30': 6,
      '14:30': 7,
      '15:30': 8,
      '16:30': 9,
      '17:30': 10,
      '18:30': 11,
      '19:30': 12
    },
    '2021-06-10': {
      '07:30': 1,
      '08:30': 2,
      '09:30': 3,
      '10:30': 4,
      '11:30': 5,
      '13:30': 6,
      '14:30': 7,
      '15:30': 8,
      '16:30': 9,
      '17:30': 10,
      '18:30': 11,
      '19:30': 12
    }
  };

  constructor(private http: HttpClient) { }

  readBooking(): Promise<any> {
    let promise = new Promise ((resolve, reject) => {
      return this.resa;
    });
    return promise;
  }

  read() {
    return this.resa;
  }
}



