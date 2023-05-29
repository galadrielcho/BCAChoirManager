import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVoicepartMaximumDialogComponent } from './new-voicepart-maximum-dialog.component';

describe('NewVoicepartMaximumDialogComponent', () => {
  let component: NewVoicepartMaximumDialogComponent;
  let fixture: ComponentFixture<NewVoicepartMaximumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVoicepartMaximumDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVoicepartMaximumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
