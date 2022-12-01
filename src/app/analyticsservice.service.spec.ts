import { TestBed } from '@angular/core/testing';

import { AnalyticsService } from './analyticsservice.service';

describe('AnalyticsserviceService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
