import { AccessLevel } from 'src/enums/access-level'

export class User {
    id: string
    companyId: string
    username: string
    email: string
    roles: AccessLevel
    firstName: string
    lastName: string
    timezone: string
}
