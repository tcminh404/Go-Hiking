import { LOGIN_PATH } from './base'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthCookieService } from 'src/services/auth/auth-cookie.service'

@Injectable({ providedIn: 'root' })
export class AuthApi {
    constructor(private http: HttpClient, private cookie: AuthCookieService) { }
    token(username: string, password: string): Observable<Token> {
        const body = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('grant_type', 'password')
            .set('clientId', this.cookie.clientId)
        return this.http.post<Token>(LOGIN_PATH, body)
    }
    refreshToken(refreshToken: string): Observable<Token> {
        const body = new HttpParams().set('refresh_token', refreshToken).set('grant_type', 'refresh_token')
        return this.http.post<Token>(LOGIN_PATH, body)
    }
}
interface Token {
    access_token: string
    token_type: string
    refresh_token: string
    expires_in: number
    scope: string
}
