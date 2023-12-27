import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Entry, EntryJS} from "../model/entry";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  getEntries(): Observable<Array<Entry>> {
    return this.http.get<Array<EntryJS>>(environment.restUrl + '/api/entry')
      .pipe(
        map(
          entriesJS => entriesJS.map(entryJS => Entry.fromHttp(entryJS))
        )
      );
  }

  addEntry(): Observable<string> {
    return this.http.post(environment.restUrl + '/api/entry', null,
      {withCredentials: true, responseType: "text"}
    );
  }
}
