import { Post } from 'src/models/post';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[]
  @Input() user: User
  @Output() delete = new EventEmitter<Post>()
  @Output() edit = new EventEmitter<Post>()
  dataSource: Post[]
  displayedColumns: string[] = ['postId', 'parentId', 'type', 'title', 'content'];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.dataSource = this.posts
  }

  onDelete(post: Post) {
    this.delete.emit(post)
  }

  onEdit(item) {
    this.edit.emit(item)
  }
}
