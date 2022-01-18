import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()//HttpInterceptor has intercept() method to inspect and transform HTTP requests before they are sent to server
export class AuthInterceptor implements HttpInterceptor {//add Authorization header with 'Bearer' prefix to the toke
  constructor(private token: TokenStorageService) { }

  //intercept() gets HTTPRequest object, change it and forward to HttpHandler object’s handle() method
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {//It transforms HTTPRequest object into an Observable<HttpEvents>
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
