import { Component } from '@angular/core';
import {EntryService} from "../service/entry.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [],
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css'
})
export class NewEntryComponent {
  newEntryId = '';

  constructor(private entryService: EntryService,
              private router: Router) {
  }

  addEntry() {
    this.entryService.addEntry().subscribe({
      next: value => {
        this.newEntryId = value;
        this.router.navigate(['entry/update'], {
          queryParams: {entryId: value}
        });
      },
      error: err => console.log(err)
    });
  }
}
