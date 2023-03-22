import { TestBed } from '@angular/core/testing';

import { SuppliersGuard } from './suppliers-guard.guard';

describe('SuppliersGuardGuard', () => {
  let guard: SuppliersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuppliersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
