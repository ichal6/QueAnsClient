import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Question} from "../model/question";
import {QuestionService} from "../service/question.service";
import {Answer} from "../../answer/model/answer";
import {AnswerService} from "../../answer/service/answer.service";

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [],
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent implements OnInit, OnDestroy {
  private _subscribeQuestion: Subscription;
  private _subscribeAnswers: Subscription;
  question?: Question;
  answers?: Array<Answer>;
  message: string;
  hasLoaded: boolean;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {
    this._subscribeQuestion = Subscription.EMPTY;
    this._subscribeAnswers = Subscription.EMPTY;
    this.message = "";
    this.hasLoaded = false;
  }

  ngOnInit(): void {
    this.requestQuestion();
  }

  ngOnDestroy(): void {
    this._subscribeQuestion?.unsubscribe();
    this._subscribeAnswers?.unsubscribe();
  }

  requestQuestion(): void {
    this._subscribeQuestion = this.questionService.getRandomQuestion().subscribe({
      next: (res) => {
        this.question = res;
        this.hasLoaded = true;
      },
      error: err => {
        console.error('problem with loading the questions: ', err);
        this.message = err.message;
      },
      complete: () => console.log('Completed fetch question')
    });
  }

  getAnswer(): string {
    if(this.answers) {
      const randIndex = Math.floor(Math.random() * this.answers.length);
      return this.answers[randIndex].answer;
    }
    return 'no answers';
  }

  requestAnswers(): void {
    if(!this.question)
      return
    this._subscribeAnswers = this.answerService.getAnswersForEntry(this.question.entryId).subscribe({
      next: (res) => {
        this.answers = res;
      },
      error: err => {
        console.error('problem with loading the answers: ', err);
        this.message = err.message;
      },
      complete: () => console.log('Completed fetch answers')
    });
  }

  protected readonly Math = Math;
}
