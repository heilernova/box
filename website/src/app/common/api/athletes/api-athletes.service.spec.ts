import { TestBed } from '@angular/core/testing';

import { ApiAthletesService } from './api-athletes.service';

describe('ApiAthletesService', () => {
  let service: ApiAthletesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAthletesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
