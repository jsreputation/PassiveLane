import {inject, TestBed} from '@angular/core/testing';

import {AntiGuard} from './anti.guard';
describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AntiGuard]
    });
  });

  it('should ...', inject([AntiGuard], (guard: AntiGuard) => {
    expect(guard).toBeTruthy();
  }));
});
