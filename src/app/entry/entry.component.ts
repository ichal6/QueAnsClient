import {Component, OnDestroy, OnInit, signal, Signal} from '@angular/core';
import {EntryService} from "./service/entry.service";
import {Subscription} from "rxjs";
import {Entry} from "./model/entry";
import {AuthService} from "../authentication/auth.service";
import {NewEntryComponent} from "./new-entry/new-entry.component";
import {RouterOutlet} from "@angular/router";
import {SingleEntryComponent} from "./single-entry/single-entry.component";

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [
    NewEntryComponent,
    RouterOutlet,
    SingleEntryComponent
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit, OnDestroy{
  private subscribeEntries: Subscription;
  entries: Array<Entry>;
  message: string;
  hasLoaded: boolean;
  isAuthenticated: Signal<boolean>

  constructor(private entryService: EntryService,
              private authService: AuthService) {
    this.subscribeEntries = Subscription.EMPTY;
    this.entries = new Array<Entry>();
    this.message = "";
    this.hasLoaded = false;
    this.isAuthenticated = signal(this.authService.isAuthenticated);
  }

  ngOnInit(): void {
    this.requestEntries();
    this.isAuthenticated = signal(this.authService.isAuthenticated);
  }

  ngOnDestroy(): void {
    this.subscribeEntries?.unsubscribe();
  }

  private requestEntries(): void {
    this.subscribeEntries = this.entryService.getEntries().subscribe({
      next: (res) => {
        this.entries = res;
        this.hasLoaded = true;
      },
      error: err => {
        console.error(err);
        this.message = err.message;
        },
      complete: () => console.log('Completed fetch entries')
    });
  }
}
