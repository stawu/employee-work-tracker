import { TestBed } from '@angular/core/testing';

import { QrBadgeGeneratorService } from './qr-badge-generator.service';

describe('QrBadgeGeneratorService', () => {
  let service: QrBadgeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrBadgeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
