import {Component, Input, OnDestroy} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {AnswerService} from "../service/answer.service";

@Component({
  selector: 'app-new-answer',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-answer.component.html',
  styleUrl: './new-answer.component.css'
})
export class NewAnswerComponent implements OnDestroy{
  @Input() entryId!: string;
  answer: string;
  message: string;
  answerSubscription: Subscription;

  constructor(private answerService: AnswerService) {
    this.answer = '';
    this.message = '';
    this.answerSubscription = Subscription.EMPTY;
  }

  onSubmit() {
    this.answerSubscription?.unsubscribe();
    this.answerSubscription = this.answerService.addAnswer(this.entryId, this.answer).subscribe({
      next: (value) => this.message = 'Answer has added = ' + value.answer,
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.answerSubscription?.unsubscribe();
  }
}
