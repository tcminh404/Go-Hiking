import { Post } from 'src/models/post';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[]
  @Input() user: User
  dataSource: Post[]
  displayedColumns: string[] = ['postId', 'parentId', 'type', 'title', 'content'];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.dataSource = this.posts
    console.log(this.posts);
  }

  onDelete(postId: String) {

  }
}
