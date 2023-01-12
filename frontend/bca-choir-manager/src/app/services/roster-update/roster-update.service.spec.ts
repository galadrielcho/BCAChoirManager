import { TestBed } from '@angular/core/testing';

import { RosterUpdateService } from './roster-update.service';

describe('RosterUpdateService', () => {
  let service: RosterUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RosterUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
