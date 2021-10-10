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
    this.postService.allPost().subscribe(posts => this.posts = posts)
  }

  reloadPost() {
    this.postService.allPost().subscribe(posts => this.posts = posts)
  }

  newPost(post: Post = null) {
    let dialogRef = this.dialog.open(NewPostComponent, {
      data: { user: this.user, post: post }
    })
    dialogRef.afterClosed().subscribe(() => { this.reloadPost() })
  }

  onDelete(post: Post) {
    if (confirm("Are you sure to delete post: " + post.title)) {
      this.postService.deletePost(post.postId).subscribe(
        (info) => {
          alert(info)
          this.reloadPost()
          console.log(info)
        },
        (error) => {
          alert(error.error.message)
          console.log(error)
        }
      )
    }
  }
  onEdit(post) {
    this.newPost(post)
  }
}
