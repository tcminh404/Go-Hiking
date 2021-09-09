
import { map, concatMap, catchError, finalize } from 'rxjs/operators'
import { AuthApi } from 'src/api/auth/auth'
import { Injectable } from '@angular/core'
import { AuthCookieService } from './auth-cookie.service'
import { UserService } from './user.service'
import { BehaviorSubject, throwError, Observable, Subscription } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _isLoggedIn: boolean
    private _isRefreshing: boolean
    private refreshCompleteSubject: BehaviorSubject<any>
    private clientSubscription = Subscription.EMPTY
    constructor(
        private api: AuthApi,
        private cookie: AuthCookieService,
        private userService: UserService
    ) {
        this.refreshCompleteSubject = new BehaviorSubject(null)
    }
    get isLoggedIn(): boolean {
        return this._isLoggedIn
    }
    get isRefreshing(): boolean {
        return this._isRefreshing
    }
    get refreshComplete$(): Observable<any> {
        return this.refreshCompleteSubject.asObservable()
    }
    login(username: string, password: string) {
        return this.api.token(username, password).pipe(
            map((token) => {
                this.cookie.setAccessToken(token.access_token, token.expires_in)
                this.cookie.setRefreshToken(token.refresh_token)
                return token
            }),
            concatMap((token) => this.info())
        )
    }
    logout() {
        return this.userService.logout().pipe(
            map((success) => {
                this.clear()
                return success
            })
        )
    }
    logoutAnyway() {
        this.clear()
    }

    info() {
        return this.userService.info().pipe(
            map((user) => {
                this._isLoggedIn = true
                return user
            })
        )
    }
    clear() {
        this._isLoggedIn = false
        this._isRefreshing = false
        this.cookie.clear()
    }
    init() {
        const accessToken = this.cookie.accessToken
        if (accessToken) {
            return this.info()
        } else {
            this._isRefreshing = true
            return this._refresh().pipe(
                concatMap((token) =>
                    this.info().pipe(
                        catchError((err) => {
                            this._isRefreshing = false
                            return throwError(err)
                        }),
                        finalize(() => {
                            this._isRefreshing = false
                        })
                    )
                )
            )
        }
    }
    refresh() {
        this._isRefreshing = true
        return this._refresh()
    }
    private _refresh() {
        const refreshToken = this.cookie.refreshToken
        if (refreshToken) {
            return this.api.refreshToken(refreshToken).pipe(
                map((token) => {
                    this.cookie.setAccessToken(token.access_token, token.expires_in)
                    return token
                }),
                catchError((err) => {
                    this.logoutAnyway()
                    return throwError(err)
                })
            )
        } else {
            return throwError({ message: 'No refresh token found' })
        }
    }
}
