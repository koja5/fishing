import { TestBed } from '@angular/core/testing';

import { LoggedAnyService } from './logged-any.service';

describe('LoggedAnyService', () => {
  let service: LoggedAnyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedAnyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
