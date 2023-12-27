import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Question, QuestionJS} from "../model/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getRandomQuestion(): Observable<Question> {
    return this.http.get<QuestionJS>(environment.restUrl + '/api/question/random')
      .pipe(
        map(
          questionJS => Question.fromHttp(questionJS)
        )
      );
  }

  getQuestionsForEntry(entryId: string): Observable<Array<Question>> {
    return this.http.get<Array<QuestionJS>>(environment.restUrl + '/api/entry/' + entryId + '/questions')
      .pipe(
        map(
          questionJSArray => questionJSArray.map(questionJS => Question.fromHttp(questionJS, entryId))
        )
      );
  }

  addNewQuestion(entryId: string, newQuestion: string): Observable<Question> {
    return this.http.post<QuestionJS>(
      environment.restUrl + '/api/question/' + entryId,
      {'question': newQuestion},
      {withCredentials: true}
    )
      .pipe(
        map(
          questionJS => Question.fromHttp(questionJS, entryId)
        )
      );
  }
}
