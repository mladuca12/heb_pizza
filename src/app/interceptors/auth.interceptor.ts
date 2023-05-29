import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const authorizedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    if (token !== null) {
      return next.handle(authorizedRequest);
    } else {
      return next.handle(req);
    }
  }
}
