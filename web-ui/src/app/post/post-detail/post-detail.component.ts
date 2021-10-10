import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Comment } from 'src/models/comment';
import { Post } from 'src/models/post';
import { User } from 'src/models/user';
import { UserService } from 'src/services/auth/user.service';
import { PostService } from 'src/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from 'src/models/location';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  posts$!: Observable<Post[]>;
  post$!: Observable<Post>;
  postId: string
  comments: Comment[]
  locations: Location[]
  user: User
  commentOnEdit: Comment
  locationOnEdit: Location
  showEditLocation = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.postId = params.get('id'));
    this.posts$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getPost(params.get('id')!))
    );
    this.service.allCommentByParentId(this.postId).subscribe(comments => { this.comments = comments })
    this.userService.user$.subscribe(user => this.user = user)
  }

  ngAfterContentInit() {
    this.post$ = this.posts$.pipe(map((posts: Post[]) => posts.find(hero => hero.parentId === null || hero.parentId === '')!))
    this.post$.subscribe(info => {
      if (info.type === 'story')
        this.service.allLocationByParentId(this.postId).subscribe(locations => { this.locations = locations })
    })
  }

  gotoPosts() {
    this.router.navigate(['/post']);
  }

  reloadComment() {
    this.service.allCommentByParentId(this.postId).subscribe(comments => { this.comments = comments });
  }
  reloadLocation() {
    this.hideLocation()
    this.service.allLocationByParentId(this.postId).subscribe(locations => { this.locations = locations })
  }
  display() {
    if (!this.comments)
      return false
    else
      if (this.comments.length > 0) return true
    return false
  }
  onDelete(post) {
    if (confirm("Are you sure to delete this:\n" + post.content)) {
      this.service.deleteComment(post.postId).subscribe(
        (info) => {
          alert(info)
          this.reloadComment()
          console.log(info)
        },
        (error) => {
          alert(error.error.message)
          console.log(error)
        }
      )
    }
  }
  onDeleteLocation(post) {
    if (confirm("Are you sure to delete this:\n" + post.content)) {
      this.service.deleteLocation(post.postId).subscribe(
        (info) => {
          alert(info)
          this.reloadLocation()
          console.log(info)
        },
        (error) => {
          alert(error.error.message)
          console.log(error)
        }
      )
    }
  }
  showLocationAction(post, user) {
    return (post.username === user.username && post.type === 'story')
  }
  showLocation() {
    this.showEditLocation = true
  }
  hideLocation() {
    this.showEditLocation = false
  }
  onEdit(comment) {
    this.commentOnEdit = comment
  }
  cancelEdit() {
    this.commentOnEdit = null
  }
  onEditLocation(item) {
    this.showLocation()
    this.locationOnEdit = item
  }
  cancelEditLocation() {
    this.hideLocation()
    this.locationOnEdit = null
  }
  addLocation() {
    this.showLocation()
    this.locationOnEdit = null
  }
}
