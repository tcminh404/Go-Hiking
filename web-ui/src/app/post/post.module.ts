import { HereMapModule } from './../here-map/here-map.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from 'src/material/material.module';
import { NewPostComponent } from './new-post/new-post.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentComponent } from './comment/comment.component';
import { NewLocationComponent } from './new-location/new-location.component';


@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    NewPostComponent,
    PostDetailComponent,
    CommentComponent,
    NewLocationComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularEditorModule,
    HereMapModule,
  ],
  exports: [
    PostComponent
  ]
})
export class PostModule { }
