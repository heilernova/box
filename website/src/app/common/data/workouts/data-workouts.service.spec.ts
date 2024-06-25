import { TestBed } from '@angular/core/testing';

import { DataWorkoutsService } from './data-workouts.service';

describe('DataWorkoutsService', () => {
  let service: DataWorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataWorkoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
