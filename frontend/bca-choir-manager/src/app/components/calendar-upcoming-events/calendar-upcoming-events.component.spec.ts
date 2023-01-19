import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarUpcomingEventsComponent } from './calendar-upcoming-events.component';

describe('CalendarUpcomingEventsComponent', () => {
  let component: CalendarUpcomingEventsComponent;
  let fixture: ComponentFixture<CalendarUpcomingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarUpcomingEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarUpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
