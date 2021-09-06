const CLIENT_NAME = 'web-ui'
const CLIENT_SECRET = 'secret'
export const DEFAULT_GLOBAL_USER = 'admin'
export const AUTH_HEADER = {
    Authorization: 'Basic ' + btoa(`${CLIENT_NAME}:${CLIENT_SECRET}`),
    'Content-type': 'application/x-www-form-urlencoded',
}
