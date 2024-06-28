import { TestBed } from '@angular/core/testing';

import { DataCountriesService } from './data-countries.service';

describe('DataCountriesService', () => {
  let service: DataCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
