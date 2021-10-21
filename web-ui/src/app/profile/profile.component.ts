import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessLevel } from 'src/enums/access-level';
import { User } from 'src/models/user';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FriendRequest } from 'src/models/friend-request';

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
  requests: FriendRequest[]
  friends: User[]

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.isAdmin = user.roles == AccessLevel.Admin;
    })
    this.reloadData()
  }
  editProfile() {
    let dialogRef = this.dialog.open(EditProfileComponent, {
      data: { user: this.user }
    })
    dialogRef.afterClosed().subscribe(() => {
      this.userService.user$.subscribe(user => { this.user = user; this.isAdmin = user.roles == AccessLevel.Admin })
    })
  }
  reloadData() {
    this.userService.getFriendRequest().subscribe(data => {
      this.requests = data
    })
    this.userService.getFriend().subscribe(data => {
      this.friends = data
    })
  }

}
