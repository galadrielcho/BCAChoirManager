import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecipientsInputComponent } from './email-recipients-input.component';

describe('EmailRecipientsInputComponent', () => {
  let component: EmailRecipientsInputComponent;
  let fixture: ComponentFixture<EmailRecipientsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRecipientsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailRecipientsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
