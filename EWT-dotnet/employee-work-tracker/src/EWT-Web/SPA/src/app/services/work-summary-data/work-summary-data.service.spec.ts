import { TestBed } from '@angular/core/testing';

import { WorkSummaryDataService } from './work-summary-data.service';

describe('WorkSummaryDataService', () => {
  let service: WorkSummaryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkSummaryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
