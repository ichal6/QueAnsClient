import {Component, OnDestroy, OnInit} from '@angular/core';
import {EntryService} from "./service/entry.service";
import {Subscription} from "rxjs";
import {Entry} from "./model/entry";

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit, OnDestroy{
  private subscribeEntries: Subscription;
  entries: Array<Entry>;
  message: string;
  hasLoaded: boolean;

  constructor(private entryService: EntryService) {
    this.subscribeEntries = Subscription.EMPTY;
    this.entries = new Array<Entry>();
    this.message = "";
    this.hasLoaded = false;
  }

  ngOnInit(): void {
    this.requestEntries();
  }

  ngOnDestroy(): void {
    this.subscribeEntries?.unsubscribe();
  }

  requestEntries(): void {
    this.subscribeEntries = this.entryService.getEntries().subscribe({
      next: (res) => {
        this.entries = res;
        this.hasLoaded = true;
      },
      error: err => {
        console.error('problem with loading the entries: ', err);
        this.message = err.message;
        },
      complete: () => console.log('Completed fetch entries')
    });
  }

}
