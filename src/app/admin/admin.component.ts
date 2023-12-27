import {Component} from '@angular/core';
import {AuthService} from "../authentication/auth.service";
import {EntryComponent} from "../entry/entry.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    EntryComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
