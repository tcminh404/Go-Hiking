import { FriendRequestDialogComponent } from 'src/app/dialog/friend-request-dialog/friend-request-dialog.component';
import { AccessLevel } from 'src/enums/access-level';
import { AuthService } from 'src/services/auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeoData } from 'src/models/geo-data';
import { GeoService } from 'src/services/geo.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user';
import { UserService } from 'src/services/auth/user.service';
import { FriendRequest } from 'src/models/friend-request';


@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit {
  @Input() requests: FriendRequest[]
  @Output() reload = new EventEmitter()
  dataSource: MatTableDataSource<FriendRequest>
  displayedColumns: string[] = ['request', 'target', 'msg'];
  adminRoles = AccessLevel.Admin

  //geos: GeoData[]

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    //private geoService: GeoService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    //this.geoService.all().subscribe(geos => this.geos = geos)
    // this.userService.all().subscribe(users => {
    //   this.users = users
    //   this.dataSource.data = users
    // })
  }

  clickUser(row) {
    let dialogRef = this.dialog.open(FriendRequestDialogComponent, {
      data: {
        request: row
      }
    })
    dialogRef.afterClosed().subscribe(() => this.reload.emit())
  }

  ngOnChanges() {
    this.dataSource.data = this.requests
  }

}
