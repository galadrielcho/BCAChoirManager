import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistreesDialogComponent } from './event-dialog-with-registrees.component';

describe('EventRegistreesDialogComponent', () => {
  let component: EventRegistreesDialogComponent;
  let fixture: ComponentFixture<EventRegistreesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRegistreesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRegistreesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
