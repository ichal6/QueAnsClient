import { TestBed } from '@angular/core/testing';

import { AnswerService } from './answer.service';
import {provideHttpClient} from "@angular/common/http";

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
