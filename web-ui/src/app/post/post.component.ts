import { User } from 'src/models/user';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/services/auth/user.service';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/models/post';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from './new-post/new-post.component';
import { FRIEND, PUBLIC } from 'src/constants/access-type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  user: User;
  posts: Post[];
  dataSource: Post[];
  filterValue: 'all'

  constructor(
    private postService: PostService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => this.user = user)
    this.postService.allPost().subscribe(posts => {
      this.posts = posts
      this.dataSource = posts;
    })
  }

  reloadPost() {
    this.postService.allPost().subscribe(posts => {
      this.posts = posts
      this.filterPosts(this.filterValue)
    })
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
        },
        (error) => {
          alert(error.error.message)
        }
      )
    }
  }
  onEdit(post) {
    this.newPost(post)
  }
  displayPost() {
    return this.dataSource && this.dataSource.length > 0
  }
  filterPosts(value) {
    this.filterValue = value
    switch (value) {
      case 'seft':
        return this.dataSource = this.posts.filter(data => {
          return data.username === this.user.username
        })
      case 'friend':
        return this.dataSource = this.posts.filter(data => {
          return data.access === FRIEND && data.username !== this.user.username
        })
      case 'public':
        return this.dataSource = this.posts.filter(data => {
          return data.access === PUBLIC
        })
      default:
        return this.dataSource = this.posts
    }
  }
}
