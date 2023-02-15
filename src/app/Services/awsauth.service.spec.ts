import { TestBed } from '@angular/core/testing';

import { AWSAuthService } from './awsauth.service';

describe('AWSAuthService', () => {
  let service: AWSAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AWSAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
