import { AccessLevel } from './../../../enums/access-level';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/auth/user.service';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLogin = false
  isAdmin = false

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.updataInterface(user))
  }

  updataInterface(user) {
    if (user) {
      this.isLogin = true
      this.isAdmin = user.roles == AccessLevel.Admin
    } else {
      this.isLogin = false
      this.isAdmin = false
    }
  }

  home() {
    this.router.navigate(['/'])
  }
  admin() {
    this.router.navigate(['/admin'])
  }
  login() {
    this.router.navigate(['/login'])
  }
  profile() {
    this.router.navigate(['/profile'])
  }
  logout() {
    this.auth.logout().subscribe((value) => { this.router.navigate(['/']) }, (err) => { })
  }

}
