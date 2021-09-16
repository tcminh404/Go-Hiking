import { AuthCookieService } from 'src/services/auth/auth-cookie.service'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { API } from 'src/constants/api.path'
import { AUTH_HEADER } from 'src/constants/auth'
import { AuthService } from 'src/services/auth/auth.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private cookie: AuthCookieService, private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.endsWith(API.LOGIN)) {
            request = authHeader(request)
        } else {
            request = header(request, getToken(this.cookie))
        }
        return next.handle(request)
    }
}
const authHeader = (request: HttpRequest<any>) => {
    return request.clone({
        setHeaders: AUTH_HEADER,
    })
}
export const header = (request: HttpRequest<any>, token) => {
    if (token) {
        token = `Bearer ${token}`
    }
    return request.clone({
        setHeaders: { Authorization: token },
    })
}
export const getToken = (cookie) => {
    return cookie.accessToken
}
