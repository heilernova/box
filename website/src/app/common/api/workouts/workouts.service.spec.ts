import { TestBed } from '@angular/core/testing';

import { ApiWorkoutsService } from './workouts.service';

describe('WorkoutsService', () => {
  let service: ApiWorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWorkoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
