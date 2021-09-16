import { environment } from "src/environments/environment";
const _API = '/rest'
const _AUTH = `${_API}/auth`
const _LOGIN = '/oauth/token'
const _LOGOUT = '/user/logout'
const _V1 = '/v1'

export const API = {
    LOGIN: `${environment.host_auth}${_LOGIN}`,
    LOGOUT: `${environment.host_auth}${_AUTH}${_V1}${_LOGOUT}`,
    AUTH: `${environment.host_auth}${_AUTH}${_V1}`
}