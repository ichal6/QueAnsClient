import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AnswerService} from "../service/answer.service";
import {Answer} from "../model/answer";

@Component({
  selector: 'app-all-answer',
  standalone: true,
  imports: [],
  templateUrl: './all-answer.component.html',
  styleUrl: './all-answer.component.css'
})
export class AllAnswerComponent implements OnInit, OnDestroy{
  @Input() entryId!: string;
  answers: Array<Answer>;
  message: string;
  private allAnswerSubscription: Subscription;

  constructor(private answerService: AnswerService) {
    this.allAnswerSubscription = Subscription.EMPTY;
    this.answers = new Array<Answer>();
    this.message = '';
  }

  ngOnInit(): void {
    this.allAnswerSubscription = this.answerService.getAnswersForEntry(this.entryId).subscribe({
      next: (value) => this.answers = value,
      error: err => this.message = err.message
    })
  }

  ngOnDestroy(): void {
    this.allAnswerSubscription?.unsubscribe();
  }

}
