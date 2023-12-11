import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Question} from "../model/Question";
import {QuestionService} from "../service/question.service";

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [],
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent implements OnInit, OnDestroy {
  private subscribeQuestion: Subscription;
  question?: Question;
  message: string;
  hasLoaded: boolean;

  constructor(private questionService: QuestionService) {
    this.subscribeQuestion = Subscription.EMPTY;
    this.message = "";
    this.hasLoaded = false;
  }

  ngOnInit(): void {
    this.requestQuestion();
  }

  ngOnDestroy(): void {
    this.subscribeQuestion?.unsubscribe();
  }

  requestQuestion(): void {
    this.subscribeQuestion = this.questionService.getRandomQuestion().subscribe({
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
}
