import { TestBed } from '@angular/core/testing';

import { ApiRmsService } from './api-rms.service';

describe('ApiRmsService', () => {
  let service: ApiRmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
