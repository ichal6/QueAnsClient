import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {QuestionService} from "../service/question.service";

@Component({
  selector: 'app-new-question',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent {
  @Input() entryId!: string;
  newQuestion: string;
  newQuestionSubscription: Subscription;
  message: string;

  constructor(private questionService: QuestionService) {
    this.newQuestion = '';
    this.newQuestionSubscription = Subscription.EMPTY;
    this.message = '';
  }

  onSubmit() {
    this.questionService.addNewQuestion(this.entryId, this.newQuestion).subscribe({
    next: value => this.message = 'Question has added = ' + value.question,
    error: err => console.error(err)
    });
  }
}
