import { TestBed } from '@angular/core/testing';

import { AnalyitcsService } from './analyitcs.service';

describe('AnalyitcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalyitcsService = TestBed.get(AnalyitcsService);
    expect(service).toBeTruthy();
  });
});
