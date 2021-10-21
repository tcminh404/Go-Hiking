import { AccessLevel } from 'src/enums/access-level'

export class User {
    id: string
    username: string
    email: string
    roles: AccessLevel
    firstName: string
    lastName: string
    access: string
}
