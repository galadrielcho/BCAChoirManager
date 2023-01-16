import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventTabComponent } from './calendar-event-tab.component';

describe('CalendarEventTabComponent', () => {
  let component: CalendarEventTabComponent;
  let fixture: ComponentFixture<CalendarEventTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEventTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
