import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicepartLimitDialogComponent } from './voicepart-limit-dialog.component';

describe('VoicepartLimitDialogComponent', () => {
  let component: VoicepartLimitDialogComponent;
  let fixture: ComponentFixture<VoicepartLimitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoicepartLimitDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicepartLimitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
