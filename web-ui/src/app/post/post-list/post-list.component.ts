import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/models/post';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/models/user';
import { AccessLevel } from 'src/enums/access-level';

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
  isAdmin = false
  adminRole = AccessLevel.Admin
  dataSource: MatTableDataSource<Post>
  displayedColumns: string[] = ['title', 'user', 'type', 'access', 'action'];

  constructor() {
    this.dataSource = new MatTableDataSource
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.dataSource.data = this.posts
  }

  onDelete(post: Post) {
    this.delete.emit(post)
  }

  onEdit(item) {
    this.edit.emit(item)
  }
}
