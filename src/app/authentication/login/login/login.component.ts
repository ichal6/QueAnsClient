import {Component, effect} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService,
              private route: Router) {
    this.email = "";
    this.password = "";
    effect(() => {
      if(this.authService.isAuthenticated()) {
        this.route.navigate(['admin'])
      }
    });
  }

  onSubmit(): void {
    this.authService.authenticate(this.email, this.password);
  }
}
