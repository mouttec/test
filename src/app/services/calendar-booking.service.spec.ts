import { TestBed } from '@angular/core/testing';

import { CalendarBookingService } from './calendar-booking.service';

describe('CalendarBookingService', () => {
  let service: CalendarBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
