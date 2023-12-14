import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Question} from "../model/question";
import {QuestionService} from "../service/question.service";
import {Answer} from "../../answer/model/answer";
import {AnswerService} from "../../answer/service/answer.service";
import {AnswerComponent} from "../../answer/answer.component";

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [
    AnswerComponent
  ],
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent implements OnInit, OnDestroy {
  private _subscribeQuestion: Subscription;
  private _subscribeAnswers: Subscription;
  question!: Question;
  answers: Array<Answer>;
  message: string;
  hasLoadedQuestion: boolean;
  loadAnswersArray: boolean;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {
    this._subscribeQuestion = Subscription.EMPTY;
    this._subscribeAnswers = Subscription.EMPTY;
    this.message = "";
    this.hasLoadedQuestion = false;
    this.loadAnswersArray = false;
    this.answers = [];
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
        this.hasLoadedQuestion = true;
      },
      error: err => {
        console.error('problem with loading the questions: ', err);
        this.message = err.message;
      },
      complete: () => console.log('Completed fetch question')
    });
  }

  loadAnswers(): void {
    if(!this.loadAnswersArray)
      this.requestAnswers();
  }

  requestAnswers(): void {
    if(!this.question)
      return
    this._subscribeAnswers = this.answerService.getAnswersForEntry(this.question.entryId).subscribe({
      next: (res) => {
        this.answers = res;
        this.loadAnswersArray = true;
      },
      error: err => {
        console.error('problem with loading the answers: ', err);
        this.message = err.message;
      },
      complete: () => console.log('Completed fetch answers')
    });
  }

  getAnswer(): Answer | undefined {
    if(this.answers.length != 0) {
      const randIndex = Math.floor(Math.random() * this.answers.length);
      return this.answers[randIndex];
    }
    return undefined;
  }
}
