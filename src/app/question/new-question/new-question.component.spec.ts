import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionComponent } from './new-question.component';
import createSpyObj = jasmine.createSpyObj;
import {QuestionService} from "../service/question.service";

describe('NewQuestionComponent', () => {
  let component: NewQuestionComponent;
  let fixture: ComponentFixture<NewQuestionComponent>;

  beforeEach(async () => {
    const mockQuestionService = createSpyObj('QuestionService', ['addNewQuestion']);

    await TestBed.configureTestingModule({
      imports: [NewQuestionComponent],
      providers: [
        {
          provide: QuestionService,
          useValue: mockQuestionService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
