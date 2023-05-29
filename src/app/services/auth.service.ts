import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject(
      localStorage.getItem('token') !== null
    );
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/api/auth`, {
        username,
        password,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.access_token);
          this.isLoggedInSubject.next(true);
          return res;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
}
