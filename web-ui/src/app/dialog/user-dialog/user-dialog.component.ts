import { User } from 'src/models/user';
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccessLevel } from 'src/enums/access-level';
import { UserService } from 'src/services/auth/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  user: User
  loginUser: User
  canAddFriend: boolean
  canDeleteFriend: boolean
  isAdmin: boolean

  @ViewChild('message')
  message: ElementRef

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) { }

  ngOnInit() {
    this.user = this.data.user;
    this.loginUser = this.data.loginUser;
    this.canAddFriend = this.data.canAddFriend;
    this.canDeleteFriend = this.data.canDeleteFriend
    this.isAdmin = this.data.user.roles === AccessLevel.Admin
  }

  addFriend() {
    this.userService.addFriendRequest({
      id: null,
      userId: this.user.id,
      requestUsername: this.loginUser.username,
      targetUsername: this.user.username,
      msg: this.message.nativeElement.value
    }).subscribe(
      info => {
        alert("Success")
        this.closeDialog()
      },
      error => {
        alert(error.error.message)
      }
    )
  }

  deleteFriend() {
    if (confirm("Are you sure to delete friend with " + this.user.username))
      this.userService.deleteFriend(this.user).subscribe(
        info => {
          alert("Success")
          this.closeDialog()
        },
        error => {
          alert(error.error.message)
        }
      )
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
interface UserDialogData {
  loginUser: User
  user: User
  canAddFriend: boolean
  canDeleteFriend: boolean
}