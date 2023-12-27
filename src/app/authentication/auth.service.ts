import {Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly _isAuthenticated: WritableSignal<boolean>;

  constructor(private route: Router,
              private http: HttpClient) {
    this._isAuthenticated = signal(false);
    this.checkIfAlreadyAuthenticated();
  }

  authenticate(name: string, password: string): void {
    this.validateUser(name, password).subscribe({
      next: () => {
      this._isAuthenticated.set(true);
    },
    error: () => {
      this._isAuthenticated.set(false);
    }
    });
  }

  logout(): void {
    this.logoutUser().subscribe({
      next: () => {
        this._isAuthenticated.set(false);
      },
      error: (err) => console.dir({'problem with logout: ': err}),
      complete: () => this.route.navigate(['/'])
    });
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated();
  }

  private checkIfAlreadyAuthenticated(): void {
    this.isLogin().pipe(
      catchError(err => {
        console.log(err);
        throw new Error("Server is not response");
      })
    ).subscribe({
      next:  () =>  {
        this._isAuthenticated.set(true);
      },
      error: () => {
        this._isAuthenticated.set(false);
      }
    });
  }

  private validateUser(email: string, password: string): Observable<{result: string}> {
    return this.http.post<{result: string}>(environment.restUrl + '/login', {email, password}, {withCredentials: true});
  }

  private logoutUser(): Observable<void> {
    return this.http.get<void>(environment.restUrl + '/logoutUser', {withCredentials: true});
  }

  isLogin(): Observable<string> {
    return this.http.get(environment.restUrl + '/api/isLogin', {withCredentials: true, responseType: "text"});
  }
}
