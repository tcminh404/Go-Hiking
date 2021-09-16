import { API } from './../constants/api.path'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable, throwError, of } from 'rxjs'
import { catchError, filter, take, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AuthCookieService } from 'src/services/auth/auth-cookie.service'
import { AuthService } from 'src/services/auth/auth.service'
import { header, getToken } from './jwt-interceptor'
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    excludes = [API.LOGIN, API.LOGOUT, 'user/info', 'tokens']
    constructor(
        private dialog: MatDialog,
        private cookie: AuthCookieService,
        private auth: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    if (this.isExclude(this.excludes, request.url)) {
                        return throwError(err)
                    } else {
                        return this._handle401(request, next)
                    }
                } else {
                    return throwError(err)
                }
            })
        )
    }
    isExclude(excludes: string[], url: string) {
        let isExclude = false
        excludes.forEach((exclude) => {
            if (url.endsWith(exclude)) {
                isExclude = true
                return
            }
        })
        return isExclude
    }
    private _handle401(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isRefreshing) {
            return this.auth.refreshComplete$.pipe(
                filter((result) => result !== null),
                take(1),
                switchMap((value) => {
                    const _request = header(request, getToken(this.cookie))
                    return next.handle(_request)
                })
            )
        } else {
            return this.auth.refresh().pipe(
                switchMap((value) => {
                    const _request = header(request, getToken(this.cookie))
                    return next.handle(_request)
                }),
                catchError((err) => {
                    // show session timeout dialog
                    console.log(err);

                    return throwError(err)
                })
            )
        }
    }
}
