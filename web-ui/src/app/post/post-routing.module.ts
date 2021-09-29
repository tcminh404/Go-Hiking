import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: 'new', canActivate: [AuthGuard], component: NewPostComponent },
  { path: ':id', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
