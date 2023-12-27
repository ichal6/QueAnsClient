import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Answer, AnswerJS} from "../model/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswersForEntry(entryId: string): Observable<Array<Answer>> {
    return this.http.get<Array<AnswerJS>>(environment.restUrl + '/api/entry/' + entryId + '/answers')
      .pipe(
        map(
          answersJS => answersJS.map(answerJS => Answer.fromHttp(answerJS))
        )
      );
  }

  addAnswer(entryId: string, answer: string): Observable<Answer> {
    return this.http.post<AnswerJS>(
      environment.restUrl + '/api/answer/' + entryId,
      {"answer": answer},
      {withCredentials: true})
      .pipe(
        map(
          answerJS => Answer.fromHttp(answerJS)
        )
      )
  }
}
