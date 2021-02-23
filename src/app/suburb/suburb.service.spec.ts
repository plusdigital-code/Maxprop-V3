import { TestBed } from '@angular/core/testing';

import { SuburbService } from './suburb.service';

describe('SuburbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuburbService = TestBed.get(SuburbService);
    expect(service).toBeTruthy();
  });
});
