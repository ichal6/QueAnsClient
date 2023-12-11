export class Question {
  constructor(private _id: string,
              private _question: string) {
  }

  static fromHttp(questionJS: QuestionJS) {
    return new Question(questionJS.id, questionJS.question);
  }

  get id(): string {
    return this._id;
  }

  get question(): string {
    return this._question;
  }
}

export interface QuestionJS {
  id: string;
  question: string;
}
