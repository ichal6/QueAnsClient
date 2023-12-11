export class Entry {
  constructor(private _id: string,
        private _questions: string[],
        private _answers: string[]) {
  }

  static fromHttp(entryJS: EntryJS) {
    return new Entry(entryJS.id, entryJS.questions, entryJS.answers);
  }

  get id(): string {
    return this._id;
  }

  get questions(): string[] {
    return this._questions;
  }

  get answers(): string[] {
    return this._answers;
  }
}

export interface EntryJS {
  id: string;
  questions: string[],
  answers: string[]
}
