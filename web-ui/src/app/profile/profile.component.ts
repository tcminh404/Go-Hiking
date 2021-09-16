import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessLevel } from 'src/enums/access-level';
import { User } from 'src/models/user';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  preparing: boolean
  msg: string
  user: User
  isAdmin = false

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => { this.user = user; this.isAdmin = user.roles == AccessLevel.Admin })
  }
  login() {
    this.router.navigate(['/login'])
  }
}
