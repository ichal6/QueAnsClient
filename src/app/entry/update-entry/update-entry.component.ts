import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewQuestionComponent} from "../../question/new-question/new-question.component";
import {NewAnswerComponent} from "../../answer/new-answer/new-answer.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SingleEntryComponent} from "../single-entry/single-entry.component";
import {AllAnswerComponent} from "../../answer/all-answer/all-answer.component";
import {AllQuestionComponent} from "../../question/all-question/all-question.component";

@Component({
  selector: 'app-update-entry',
  standalone: true,
  imports: [
    NewQuestionComponent,
    NewAnswerComponent,
    SingleEntryComponent,
    AllAnswerComponent,
    AllQuestionComponent
  ],
  templateUrl: './update-entry.component.html',
  styleUrl: './update-entry.component.css'
})
export class UpdateEntryComponent implements OnInit, OnDestroy {
  entryId!: string;
  message: string;
  private queryParamMapSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.queryParamMapSubscription = Subscription.EMPTY;
    this.message = '';
  }

  ngOnInit(): void {
    this.queryParamMapSubscription = this.route.queryParamMap.subscribe(
      (params) => {
        if (params.has('entryId')) {
          this.entryId = params.get('entryId')!;
        } else {
          this.router.navigate(['admin']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.queryParamMapSubscription?.unsubscribe();
  }

  return() {
    this.router.navigate(['admin']);
  }
}
