import { Component } from '@angular/core';
import {AuthService} from "../authentication/auth.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
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
