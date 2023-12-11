import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import {provideHttpClient} from "@angular/common/http";

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
