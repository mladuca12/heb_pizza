import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('https://pizza-api-app.herokuapp.com/api/auth', {
        username,
        password,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.access_token);
          return res;
        })
      );
  }
}
