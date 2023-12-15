import {Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: WritableSignal<boolean>;

  constructor(private route: Router,
              private http: HttpClient) {
    this.isAuthenticated = signal(false);
    this.checkIfAlreadyAuthenticated();
  }

  authenticate(name: string, password: string): void {
    this.validateUser(name, password).subscribe({
      next: () => {
      this.isAuthenticated.set(true);
    },
    error: () => {
      this.isAuthenticated.set(false);
    }
    });
  }

  checkIfAlreadyAuthenticated(): void {
    this.isLogin().pipe(
      catchError(err => {
        console.log(err);
        throw new Error("Server is not response");
      })
    ).subscribe({
      next:  () =>  {
        this.isAuthenticated.set(true);
      },
      error: () => {
        this.isAuthenticated.set(false);
      }
    });
  }

  logout(): void {
    this.logoutUser().subscribe({
      next: () => {
        this.isAuthenticated.set(false);
      },
      error: (err) => console.dir({'problem with logout: ': err}),
      complete: () => this.route.navigate(['/'])
    });
  }

  private validateUser(email: string, password: string): Observable<{result: string}> {
    return this.http.post<{result: string}>(environment.restUrl + '/login', {email, password}, {withCredentials: true});
  }

  private logoutUser(): Observable<void> {
    return this.http.get<void>(environment.restUrl + '/logoutUser', {withCredentials: true});
  }

  private isLogin(): Observable<string> {
    return this.http.get(environment.restUrl + '/api/isLogin', {withCredentials: true, responseType: "text"});
  }
}
