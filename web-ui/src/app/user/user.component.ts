import { UserDialogComponent } from './../dialog/user-dialog/user-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccessLevel } from 'src/enums/access-level';
import { GeoData } from 'src/models/geo-data';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';
import { GeoService } from 'src/services/geo.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  dataSource = new MatTableDataSource()
  displayedColumns: string[] = ['username', 'email', 'role', 'firstName', 'lastName'];
  adminRoles = AccessLevel.Admin

  //geos: GeoData[]
  users: User[]
  user: User

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    //private geoService: GeoService
  ) { }

  ngOnInit() {
    //this.geoService.all().subscribe(geos => this.geos = geos)
    this.userService.all().subscribe(users => {
      this.users = users
      this.dataSource.data = users
    })
    this.userService.user$.subscribe(user => {
      this.user = user;
    })
  }

  clickUser(row) {
    let dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        loginUser: this.user,
        user: row,
        canAddFriend: (this.user.username !== row.username)
      }
    })
  }

}
