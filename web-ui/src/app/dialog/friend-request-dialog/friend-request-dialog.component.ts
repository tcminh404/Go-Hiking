import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FriendRequest } from 'src/models/friend-request';
import { User } from 'src/models/user';
import { UserService } from 'src/services/auth/user.service';

@Component({
  selector: 'app-friend-request-dialog',
  templateUrl: './friend-request-dialog.component.html',
  styleUrls: ['./friend-request-dialog.component.scss']
})
export class FriendRequestDialogComponent implements OnInit {
  request: FriendRequest
  canAction: boolean
  user: User

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<FriendRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDialogData
  ) {
  }

  ngOnInit(): void {
    this.request = this.data.request
    this.canAction = this.data.canAction
    this.userService.user$.subscribe(user => { this.user = user })
  }

  answerRequest(value) {
    this.userService.answerFriendRequest(this.request.id, value).subscribe(
      info => {
        alert(info)
        this.closeDialog
      },
      error => { alert(error.error.message) }
    )
  }

  closeDialog() {
    this.dialogRef.close();
  }

  canAnswer() {
    return this.request.requestUsername !== this.user.username
  }
}
interface RequestDialogData {
  request: FriendRequest
  canAction: boolean
}
