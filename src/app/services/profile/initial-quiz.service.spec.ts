import {TestBed} from '@angular/core/testing';

import {InitialQuizService} from './initial-quiz.service';

describe('IntialQuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitialQuizService = TestBed.get(InitialQuizService);
    expect(service).toBeTruthy();
  });
});
