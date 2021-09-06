import { Observable, BehaviorSubject } from 'rxjs'
import { UserApi } from 'src/api/auth/user'
import { Injectable } from '@angular/core'
import { User } from 'src/models/user'
import { map } from 'rxjs/operators'
import { Util } from 'src/helpers/util.helper'

@Injectable({ providedIn: 'root' })
export class UserService {
  private _userMap: Map<string, User>
  private userSubject: BehaviorSubject<User>
  private _user$: Observable<User>
  constructor(private api: UserApi) {
    this.userSubject = new BehaviorSubject(null)
  }

  /**
   * Get cached user map
   * @returns Map<string, User>
   */
  get userMap(): Map<string, User> {
    if (!this._userMap) {
      this._userMap = new Map()
    }
    return this._userMap
  }

  get user$() {
    if (!this._user$) {
      this._user$ = this.userSubject.asObservable()
    }
    return this._user$
  }
  get user() {
    return this.userSubject.value
  }
  /**
   * Authentication service only
   */
  info(): Observable<User> {
    return this.api.info().pipe(
      map((user) => {
        this.userSubject.next(user)
        return user
      })
    )
  }
  /**
   * Authentication service only
   */
  logout() {
    return this.api.logout().pipe(
      map((success) => {
        this._clear()
        return success
      })
    )
  }
  /** Get all user data and cached it into map */
  all(): Observable<User[]> {
    this.userMap.clear()
    return this.api.all().pipe(
      map((users) => {
        for (let i = 0, n = users.length; i < n; i++) {
          const user = users[i]
          this.userMap.set(user.username, user)
        }
        return users
      })
    )
  }
  add(user: User, password: string): Observable<User> {
    return this.api.add(user, password).pipe(
      map((_user) => {
        this.userMap.set(_user.username, _user)
        return _user
      })
    )
  }
  update(user: User): Observable<User> {
    return this.api.update(user).pipe(
      map((_user) => {
        if (this.user && _user.id === this.user.id) {
          this.userSubject.next(user)
        }
        this.userMap.set(_user.username, _user)
        return _user
      })
    )
  }
  delete(id: string): Observable<any> {
    return this.api.delete(id).pipe(
      map((success) => {
        this.userMap.delete(id)
        return success
      })
    )
  }
  updateProfile(user: User): Observable<User> {
    return this.api.updateProfile(user).pipe(
      map((_user) => {
        this.userSubject.next(user)
        return _user
      })
    )
  }
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.api.changePassword(oldPassword, newPassword)
  }
  resetPassword(userName: string, email: string): Observable<any> {
    return this.api.resetPassword(userName, email)
  }
  private _clear() {
    this.userSubject.next(null)
  }
  checkUsername(username: string): Observable<boolean> {
    return this.api.checkUserName(username)
  }
  checkEmail(email: string): Observable<boolean> {
    return this.api.checkEmail(email)
  }
  /** Find user by user name
   * @return Uer | null
   */
  find(username: string): User {
    if (Util.isEmptyString(username)) {
      return null
    }
    return this.userMap.get(username)
  }
}
