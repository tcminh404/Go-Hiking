import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  preparing: boolean
  msg: string
  user: User

  constructor(private auth: AuthService, private cookie: AuthCookieService, private router: Router) { }

  ngOnInit() {
    this.auth.info().subscribe(
      (value) => {
        this.user = value
        setTimeout(() => {
          this.preparing = false
        }, 500)
      },
      (err) => {
        this.msg = 'Some problems were encountered while we set things up for you, navigating to login...'
        setTimeout(() => {
          this.login()
          this.preparing = false
        }, 1000)
      }
    )
  }
  login() {
    this.router.navigate(['/login'])
  }
  logout() {
    this.auth.logout().subscribe((value) => { this.router.navigate(['/']) }, (err) => { })
  }

}
