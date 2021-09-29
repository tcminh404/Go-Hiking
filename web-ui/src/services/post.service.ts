import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostApi } from 'src/api/post';
import { Post } from 'src/models/post';

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
  all(): Observable<Post[]> {
    this.postMap.clear()
    return this.api.all().pipe(
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
    return this.all().pipe(
      map((posts: Post[]) => posts.filter(post => { return post.postId === id || post.parentId === id }))
    );
  }
  upsert(post: Post): Observable<Post> {
    return this.api.upsert(post).pipe(
      map((_post) => {
        this.postMap.set(_post.postId, _post)
        return _post
      })
    )
  }
}
