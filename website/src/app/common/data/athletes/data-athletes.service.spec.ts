import { TestBed } from '@angular/core/testing';

import { DataAthletesService } from './data-athletes.service';

describe('DataAthletesService', () => {
  let service: DataAthletesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAthletesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
