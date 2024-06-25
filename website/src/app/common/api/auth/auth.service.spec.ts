import { TestBed } from '@angular/core/testing';

import { ApiAuthService } from './auth.service';

describe('AuthService', () => {
  let service: ApiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
