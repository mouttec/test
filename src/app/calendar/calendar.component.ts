import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarWeekViewBeforeRenderEvent, CalendarDayViewBeforeRenderEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomDateFormatter } from 'src/app/calendar/custom-date-formatter.provider';

interface Calendar {
  idCalendar: number;
  title: string;
  start: string;
  end: string;
}

registerLocaleData(localeFr);

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})

export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Week;
  excludeDays: number[] = [0, 6];
  weekStartsOn = DAYS_OF_WEEK.SUNDAY;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent[]>;

  activeDayIsOpen: boolean = false;

  locale: string = 'fr';

  changeDay(date: Date): void {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.events$ = this.http
      .get<Calendar[]>('http://localhost:8888/MoutteCAPI/backend/api/calendar/listCalendar.php').pipe(
        map(res => {
          return res.map(event => {
            return {
              title: event.title,
              start: new Date(event.start),
              end: new Date(event.end)
            };
          });
        })
      );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.router.navigate(['/calendarPerso', event.id]);
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (
            segment.date.getHours() >= 12 && segment.date.getMinutes() ===  30 &&
            segment.date.getHours() <= 13
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender2(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 13
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender3(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() >= 18 && segment.date.getMinutes() === 30 &&
          segment.date.getHours() <= 20
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender4(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 19
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeWeekViewRender5(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 20
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() >= 12 && segment.date.getMinutes() ===  30 &&
          segment.date.getHours() <= 13) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeDayViewRender2(renderEvent: CalendarDayViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 13) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeDayViewRender3(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() >= 18 && segment.date.getMinutes() === 30 &&
          segment.date.getHours() <= 20
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeDayViewRender4(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 19
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }

  beforeDayViewRender5(renderEvent: CalendarWeekViewBeforeRenderEvent): void {
    renderEvent.hourColumns.forEach(hourColumn => {
      hourColumn.hours.forEach(hour => {
        hour.segments.forEach(segment => {
          if (segment.date.getHours() === 20
          ) {
            segment.cssClass = 'bg-disabled';
          }
        });
      });
    });
  }
}
