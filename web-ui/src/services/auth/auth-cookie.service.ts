import { USER_NAME_KEY, PASSWORD_KEY, CLIENT_ID } from "src/constants/cookie.key";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/constants/cookie.key";
import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from "uuid";

@Injectable({
    providedIn: 'root',
})
export class AuthCookieService {
    constructor(private cookie: CookieService) { }
    get accessToken() {
        return this.cookie.get(ACCESS_TOKEN_KEY)
    }
    get refreshToken() {
        return this.cookie.get(REFRESH_TOKEN_KEY)
    }
    setRefreshToken(token: string, expiresSeconds: number = 36000) {
        this.cookie.delete(REFRESH_TOKEN_KEY)
        this.cookie.set(REFRESH_TOKEN_KEY, token, expireDate(expiresSeconds))
    }
    setAccessToken(token: string, expiresSeconds: number = 3600) {
        this.cookie.delete(ACCESS_TOKEN_KEY)
        this.cookie.set(ACCESS_TOKEN_KEY, token, expireDate(expiresSeconds))
    }
    clear() {
        this.cookie.delete(ACCESS_TOKEN_KEY)
        this.cookie.delete(REFRESH_TOKEN_KEY)
        this.cookie.delete(CLIENT_ID)
    }

    set username(username: string) {
        this.cookie.delete(USER_NAME_KEY)
        this.cookie.set(USER_NAME_KEY, username)
    }
    get username() {
        return this.cookie.get(USER_NAME_KEY)
    }
    set password(password: string) {
        this.cookie.delete(PASSWORD_KEY)
        this.cookie.set(PASSWORD_KEY, password)
    }
    get password() {
        return this.cookie.get(PASSWORD_KEY)
    }
    get clientId() {
        let _clientId = this.cookie.get(CLIENT_ID)
        if (!_clientId) {
            _clientId = uuidv4()
            this.clientId = _clientId
        }
        return _clientId
    }
    set clientId(id: string) {
        this.cookie.delete(CLIENT_ID)
        this.cookie.set(CLIENT_ID, id)
    }
    clearUsernamePassword() {
        this.cookie.delete(USER_NAME_KEY)
        this.cookie.delete(PASSWORD_KEY)
    }
}

const expireDate = (seconds: number) => {
    const expire = new Date()
    expire.setSeconds(expire.getSeconds() + seconds)
    return expire
}