import { environment } from "src/environments/environment";
const _API = '/rest'
const _AUTH = `${_API}/auth`
const _LOGIN = '/oauth/token'
const _LOGOUT = '/user/logout'

export const API = {
    LOGIN: `${environment.host_auth}${_LOGIN}`,
    LOGOUT: `${environment.host_auth}${_LOGOUT}`,
    AUTH: `${environment.host_auth}${_AUTH}`
}