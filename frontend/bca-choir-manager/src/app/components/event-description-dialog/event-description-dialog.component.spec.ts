import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDescriptionDialogComponent } from './event-description-dialog.component';

describe('EventDescriptionDialogComponent', () => {
  let component: EventDescriptionDialogComponent;
  let fixture: ComponentFixture<EventDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDescriptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
