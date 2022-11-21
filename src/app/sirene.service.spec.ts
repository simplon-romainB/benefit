import { TestBed } from '@angular/core/testing';

import { SireneService } from './sirene.service';

describe('SireneService', () => {
  let service: SireneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SireneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
