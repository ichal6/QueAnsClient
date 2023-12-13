export class Answer {
  constructor(private _id: string,
              private _answer: string) {
  }

  static fromHttp(answerJS: AnswerJS) {
    return new Answer(answerJS.id, answerJS.answer);
  }

  get id(): string {
    return this._id;
  }

  get answer(): string {
    return this._answer;
  }
}

export interface AnswerJS {
  id: string;
  answer: string;
}
