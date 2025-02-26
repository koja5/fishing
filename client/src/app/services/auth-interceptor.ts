import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status != 401) {
              return;
            }
            this._router.navigate(["auth/login"]);
          } else if (err instanceof HttpErrorResponse) {
            if (err.status != 304) {
              return;
            }
            this._router.navigate(["auth/login"]);
          }
        }
      )
    );
  }
}
