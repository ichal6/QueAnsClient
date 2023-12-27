import {Component, Input} from '@angular/core';
import {Entry} from "../model/entry";
import {Router} from "@angular/router";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'app-single-entry',
  standalone: true,
  imports: [],
  templateUrl: './single-entry.component.html',
  styleUrl: './single-entry.component.css'
})
export class SingleEntryComponent {
  @Input() entry!: Entry;
  isAdmin: boolean;

  constructor(private router: Router,
              authService: AuthService) {
    this.isAdmin = authService.isAuthenticated;
  }

  edit() {
    this.router.navigate(['entry/update'], {
      queryParams: {entryId: this.entry.id}
    });
  }

}
