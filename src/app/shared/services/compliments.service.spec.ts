import { TestBed } from '@angular/core/testing';

import { ComplimentsService } from './compliments.service';

describe('ComplimentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplimentsService = TestBed.get(ComplimentsService);
    expect(service).toBeTruthy();
  });
});
