import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): boolean  {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login']);
    }
    return this.authService.isAuthenticated;
  }
}
