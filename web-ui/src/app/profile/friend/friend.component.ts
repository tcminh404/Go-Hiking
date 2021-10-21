import { AccessLevel } from 'src/enums/access-level';
import { AuthService } from 'src/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { GeoData } from 'src/models/geo-data';
import { GeoService } from 'src/services/geo.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user';
import { UserDialogComponent } from 'src/app/dialog/user-dialog/user-dialog.component';
import { UserService } from 'src/services/auth/user.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @Input() users: User[]
  dataSource: MatTableDataSource<User>
  displayedColumns: string[] = ['username', 'email', 'role', 'firstName', 'lastName'];
  adminRoles = AccessLevel.Admin

  //geos: GeoData[]

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    //private geoService: GeoService
  ) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit() {
    //this.geoService.all().subscribe(geos => this.geos = geos)
    // this.userService.all().subscribe(users => {
    //   this.users = users
    //   this.dataSource.data = users
    // })
  }

  clickUser(row) {
    let dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        user: row,
        canAddFriend: false
      }
    })
  }

  ngOnChanges() {
    this.dataSource.data = this.users
  }
}
