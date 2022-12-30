import { TestBed } from '@angular/core/testing';

import { EmailRecipientsInputService } from './email-recipients-input.service';

describe('EmailRecipientsInputService', () => {
  let service: EmailRecipientsInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailRecipientsInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
