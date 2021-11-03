import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  preparing: boolean
  msg: string
  user: User

  constructor(private auth: AuthService, private cookie: AuthCookieService, private router: Router) { }
  ngOnInit() {
    this.cookie.clearUsernamePassword()
    this.msg = 'Please wait while we set things up for you!'
    if (this.cookie.refreshToken) {
      this.preparing = true
      this.auth.init().subscribe(
        (value) => {
          this.user = value
          setTimeout(() => {
            this.preparing = false
          }, 500)
        },
        (err) => { this.user = null }
      )
    }
  }

  displayHome() {
    return this.router.url === '/'
  }
}
