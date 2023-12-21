import { Component } from '@angular/core';
import {EntryService} from "../service/entry.service";

@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [],
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css'
})
export class NewEntryComponent {
  newEntryId = '';

  constructor(private entryService: EntryService) {
  }

  addEntry() {
    this.entryService.addEntry().subscribe({
      next: value => {
        this.newEntryId = value;
        window.location.reload();
      },
      error: err => console.log(err)
    });
  }
}
