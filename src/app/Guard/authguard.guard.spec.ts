import { TestBed } from '@angular/core/testing';

import { AuthguardGuard } from './user.guard';

describe('AuthguardGuard', () => {
  let guard: AuthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
