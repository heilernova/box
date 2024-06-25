import { TestBed } from '@angular/core/testing';

import { AthletesDataService } from './athletes-data.service';

describe('AthletesDataService', () => {
  let service: AthletesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthletesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
