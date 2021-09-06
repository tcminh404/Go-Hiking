import { Observable, throwError, of, timer } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { AccessLevel } from 'src/enums/access-level'
import { BASE_PATH, LOGOUT_PATH } from './base'
@Injectable({ providedIn: 'root' })
export class UserApi {
    private readonly GET_ALL_PATH = '/users'
    private readonly MANAGED_PATH = '/user'
    private readonly CREATE_PATH = '/create'
    private readonly UPDATE_PATH = '/update'
    private readonly DELETE_PATH = '/delete'
    private readonly PROFILE_PATH = '/profile'
    private readonly INFO_PATH = '/info'
    private readonly CHANGE_PASSWORD_PATH = '/changePassword'
    private readonly RESET_PASSWORD_PATH = '/resetPassword'
    private readonly DELETE_PARAM = 'userId'
    private readonly OLD_PASSWORD_PARAM = 'oldPassword'
    private readonly NEW_PASSWORD_PARAM = 'newPassword'
    private readonly EMAIL_PARAM = 'email'

    private readonly EXISTTENCE = '/existence'
    private readonly USER_NAME = 'username'
    private readonly EMAIL = 'email'

    constructor(private http: HttpClient) { }
    all(): Observable<User[]> {
        return this.http.get<User[]>(`${BASE_PATH}${this.GET_ALL_PATH}`)
    }
    add(user: User, password: string): Observable<User> {
        const body: any = Object.assign({}, user)
        body.password = password
        return this.http.post<User>(`${BASE_PATH}${this.MANAGED_PATH}${this.CREATE_PATH}`, body)
    }
    update(user: User): Observable<User> {
        return this.http.post<User>(`${BASE_PATH}${this.MANAGED_PATH}${this.UPDATE_PATH}/${user.id}`, user)
    }
    delete(userId: string): Observable<any> {
        return this.http.delete<any>(`${BASE_PATH}${this.MANAGED_PATH}${this.DELETE_PATH}/${userId}`)
    }
    info(): Observable<User> {
        return this.http.get<User>(`${BASE_PATH}${this.MANAGED_PATH}${this.INFO_PATH}`)
    }
    updateProfile(user: User): Observable<User> {
        return this.http.post<User>(`${BASE_PATH}${this.MANAGED_PATH}${this.UPDATE_PATH}${this.PROFILE_PATH}`, user)
    }
    changePassword(oldPassword: string, newPassword: string): Observable<any> {
        const param = new HttpParams().set(this.OLD_PASSWORD_PARAM, oldPassword).set(this.NEW_PASSWORD_PARAM, newPassword)
        return this.http.post<any>(`${BASE_PATH}${this.MANAGED_PATH}${this.CHANGE_PASSWORD_PATH}`, param)
    }
    resetPassword(userName: string, email: string): Observable<any> {
        const param = new HttpParams().set(this.EMAIL_PARAM, email).set(this.USER_NAME, userName)
        return this.http.post<any>(`${BASE_PATH}${this.MANAGED_PATH}${this.RESET_PASSWORD_PATH}`, param)
    }
    logout(): Observable<any> {
        return this.http.delete<any>(LOGOUT_PATH)
    }
    public checkUserName(userName: string): Observable<boolean> {
        return this.http.get<any>(`${BASE_PATH}${this.EXISTTENCE}/${this.USER_NAME}?${this.USER_NAME}=${userName}`)
    }
    public checkEmail(email: string) {
        return this.http.get<any>(`${BASE_PATH}${this.EXISTTENCE}/${this.EMAIL}?${this.EMAIL}=${email}`)
    }
}
interface User {
    id: string
    companyId: string
    username: string
    email: string
    roles: AccessLevel
    firstName: string
    lastName: string
    timezone: string
}
