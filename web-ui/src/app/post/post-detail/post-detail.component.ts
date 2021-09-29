import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post } from 'src/models/post';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  posts$!: Observable<Post[]>;
  post$!: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostService,
  ) { }

  ngOnInit() {
    this.posts$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getPost(params.get('id')!))
    );
  }

  ngAfterContentInit() {
    this.post$ = this.posts$.pipe(map((posts: Post[]) => posts.find(hero => hero.parentId === null || hero.parentId === '')!))
  }

  gotoPosts() {
    this.router.navigate(['/post']);
  }

}
