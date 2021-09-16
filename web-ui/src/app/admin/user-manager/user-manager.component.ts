import { Component, OnInit } from '@angular/core';
import { AccessLevel } from 'src/enums/access-level';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  users: User[]
  displayedColumns: string[] = ['username', 'email', 'role', 'firstName', 'lastName'];
  adminRoles = AccessLevel.Admin
  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.all().subscribe(users => this.users = users)
  }


}
