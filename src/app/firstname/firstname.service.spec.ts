import { TestBed } from '@angular/core/testing';

import { FirstnameService } from './firstname.service';

describe('FirstnameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstnameService = TestBed.get(FirstnameService);
    expect(service).toBeTruthy();
  });
});
