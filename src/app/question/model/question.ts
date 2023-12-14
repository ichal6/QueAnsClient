export class Question {
  constructor(private _id: string,
              private _question: string,
              private _entryId: string) {
  }

  static fromHttp(questionJS: QuestionJS) {
    const baseURL: string = "http://localhost:8080/api/entry/";
    const cleanedURL: string = questionJS._links.entry.href.replace(new RegExp('^' + baseURL), '');

    return new Question(questionJS.id, questionJS.question, cleanedURL);
  }

  get id(): string {
    return this._id;
  }

  get question(): string {
    return this._question;
  }

  get entryId(): string {
    return this._entryId;
  }
}

export interface QuestionJS {
  id: string;
  question: string;
  _links: LinksJS;
}

export interface LinksJS {
    entry: {
      href: string
    }
}
