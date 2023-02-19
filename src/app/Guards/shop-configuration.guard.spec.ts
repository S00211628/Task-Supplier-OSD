import { TestBed } from '@angular/core/testing';

import { ShopConfigurationGuard } from './shop-configuration-guard.guard';

describe('ShopConfigurationGuardGuard', () => {
  let guard: ShopConfigurationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShopConfigurationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
