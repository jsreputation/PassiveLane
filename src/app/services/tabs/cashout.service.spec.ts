import { TestBed } from '@angular/core/testing';

import { CashoutService } from './cashout.service';

describe('CashoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashoutService = TestBed.get(CashoutService);
    expect(service).toBeTruthy();
  });
});
