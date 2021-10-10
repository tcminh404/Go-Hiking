import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostApi } from 'src/api/post';
import { Post } from 'src/models/post';
import { Comment } from 'src/models/comment';
import { Location } from 'src/models/location';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _postMap: Map<string, Post>
  private postSubject: BehaviorSubject<Post>

  constructor(private api: PostApi) { }

  get postMap(): Map<string, Post> {
    if (!this._postMap) {
      this._postMap = new Map()
    }
    return this._postMap
  }

  get post() {
    return this.postSubject.value
  }
  allPost(): Observable<Post[]> {
    this.postMap.clear()
    return this.api.allPost().pipe(
      map((posts) => {
        for (let i = 0, n = posts.length; i < n; i++) {
          const post = posts[i]
          this.postMap.set(post.postId, post)
        }
        return posts
      })
    )
  }
  getPost(id: string) {
    return this.allPost().pipe(
      map((posts: Post[]) => posts.filter(post => { return post.postId === id }))
    );
  }
  upsertPost(post: Post): Observable<Post> {
    return this.api.upsertPost(post).pipe(
      map((_post) => {
        this.postMap.set(_post.postId, _post)
        return _post
      })
    )
  }
  deletePost(id: string) {
    return this.api.deletePost(id)
  }
  upsertComment(comment: Comment): Observable<Comment> {
    return this.api.upsertComment(comment)
  }
  allComment(): Observable<Comment[]> {
    return this.api.allComment()
  }
  allCommentByParentId(parentId: string): Observable<Comment[]> {
    return this.api.allCommentByParentId(parentId)
  }
  deleteComment(id: string) {
    return this.api.deleteComment(id)
  }
  uploadFile(file) {
    return this.api.uploadFile(file)
  }
  deleteFile(url) {
    return this.api.deleteFile(url)
  }
  upsertLocation(location: Location): Observable<Location> {
    return this.api.upsertLocation(location)
  }
  allLocation(): Observable<Location[]> {
    return this.api.allLocation()
  }
  allLocationByParentId(parentId: string): Observable<Location[]> {
    return this.api.allLocationByParentId(parentId)
  }
  deleteLocation(id: string) {
    return this.api.deleteLocation(id)
  }
}
