import { User } from 'src/models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/auth/user.service';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/models/post';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from './new-post/new-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  user: User;
  posts: Post[];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => this.user = user)
    this.postService.all().subscribe(posts => this.posts = posts)
  }

  reloadPost() {
    this.postService.all().subscribe(posts => this.posts = posts)
  }

  newPost() {
    let dialogRef = this.dialog.open(NewPostComponent, {
      data: { user: this.user }
    })
    dialogRef.afterClosed().subscribe(() => { this.reloadPost() })
  }

}
