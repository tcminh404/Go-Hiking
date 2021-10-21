import { environment } from "src/environments/environment";
const _API = '/rest'
const _AUTH = `${_API}/auth`
const _GEO = `${_API}/geo`
const _POST = `${_API}/post`
const _LOGIN = '/oauth/token'
const _CREATE = `/user/create`
const _LOGOUT = '/user/logout'
const _V1 = '/v1'

export const API = {
    LOGIN: `${environment.host_auth}${_LOGIN}`,
    CREATE: `${environment.host_auth}${_AUTH}${_V1}${_CREATE}`,
    LOGOUT: `${environment.host_auth}${_AUTH}${_V1}${_LOGOUT}`,
    AUTH: `${environment.host_auth}${_AUTH}${_V1}`,
    GEO: `${environment.host_geo}${_GEO}${_V1}`,
    POST: `${environment.host_post}${_POST}${_V1}`
}