import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Question} from "../model/question";
import {QuestionService} from "../service/question.service";

@Component({
  selector: 'app-all-question',
  standalone: true,
  imports: [],
  templateUrl: './all-question.component.html',
  styleUrl: './all-question.component.css'
})
export class AllQuestionComponent implements OnInit, OnDestroy {
  @Input() entryId!: string;
  message: string;
  questions: Array<Question>;
  private allQuestionSubscription: Subscription;

  constructor(private questionService: QuestionService) {
    this.allQuestionSubscription = Subscription.EMPTY;
    this.message = '';
    this.questions = new Array<Question>();
  }

  ngOnInit(): void {
    this.requestAllQuestions();
  }

  ngOnDestroy(): void {
    this.allQuestionSubscription?.unsubscribe();
  }

  requestAllQuestions(): void {
    this.allQuestionSubscription = this.questionService.getQuestionsForEntry(this.entryId).subscribe({
      next: (value) => this.questions = value,
      error: err => this.message = err.message
    });
  }
}
