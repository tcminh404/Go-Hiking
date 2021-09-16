import { Injectable } from '@angular/core'
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/services/auth/auth.service'

@Injectable({
    providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.auth.isLoggedIn || this.auth.isRefreshing) {
            if (this.auth.isAdminUser) return true
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'])
        return false
    }
}
