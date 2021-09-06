import { TimezoneService } from 'src/services/timezone.service'
import { CompanyService } from 'src/services/auth/companies.service'
import { map, concatMap, catchError, finalize } from 'rxjs/operators'
import { AuthApi } from 'src/api/auth/auth'
import { Injectable } from '@angular/core'
import { AuthCookieService } from './auth-cookie.service'
import { UserService } from './user.service'
import { BehaviorSubject, throwError, Observable, Subscription } from 'rxjs'
import { ClientActiveTrackingService } from './client-active-tracking.service'
import { EVENTS } from 'src/constants/client-tracking'
import { MatDialog } from '@angular/material'
import { ClientInactiveComponent } from 'src/app/dialog/client-inactive/client-inactive.component'

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
        private userService: UserService,
        private companyService: CompanyService,
        private clientTracking: ClientActiveTrackingService,
        private dialog: MatDialog,
        private timezone: TimezoneService
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
                this.timezone.zone = user.timezone
                this._isLoggedIn = true
                this.clientTracking.start(window, EVENTS)
                this._subscribes()
                return user
            }),
            concatMap((user) => {
                this.companyService.role = user.roles
                return this.companyService.all().pipe(
                    map((companies) => {
                        this.companyService.company = this.companyService.find(user.companyId)
                        return { user, companies }
                    })
                )
            })
        )
    }
    clear() {
        // this.clientTracking.stop()
        this._unsubscribes()
        this.companyService.clear()
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
        return this._refresh().pipe(
            concatMap((token) =>
                this.companyService.refreshShadow().pipe(
                    map((shadow) => {
                        this._isRefreshing = false
                        this.refreshCompleteSubject.next(shadow)
                        return shadow
                    }),
                    catchError((err) => {
                        this._isRefreshing = false
                        this.refreshCompleteSubject.next(null)
                        return throwError(err)
                    })
                )
            ),
            catchError((err) => {
                this._isRefreshing = false
                return throwError(err)
            })
        )
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
    private _subscribes() {
        this.clientSubscription = this.clientTracking.inactive$.subscribe((value) => {
            if (value) {
                this.clientTracking.stop()
                const dialogRef = this.dialog.open(ClientInactiveComponent, {
                    width: '22em',
                    data: this,
                    disableClose: true,
                })
                dialogRef.afterClosed().subscribe((keepSession) => {
                    if (keepSession) {
                        this.clientTracking.start(window, EVENTS)
                        this._unsubscribes()
                        this._subscribes()
                    }
                })
            }
        })
    }
    private _unsubscribes() {
        this.clientSubscription.unsubscribe()
    }
}
