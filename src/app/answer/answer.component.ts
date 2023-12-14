import {Component, Input} from '@angular/core';
import {Answer} from "./model/answer";

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent{
  @Input()
  answer?: Answer;
}
