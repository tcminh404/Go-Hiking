import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Comment } from 'src/models/comment';
import { User } from 'src/models/user';
import { UserService } from 'src/services/auth/user.service';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() parentId: string
  @Input() comment: Comment
  @Output() reload = new EventEmitter()
  @Output() cancel = new EventEmitter()
  user: User
  commentForm: FormGroup
  errorMsg: string

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.compose([Validators.required])],
    })
    this.userService.user$.subscribe(user => this.user = user)
  }

  ngOnChanges() {
    if (this.comment)
      this.commentForm.controls.content.setValue(this.comment.content)
  }

  cancelEdit() {
    this.cancel.emit()
    this.commentForm.controls.content.setValue('')
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return
    }
    let comment: Comment = this.commentForm.value
    comment.username = this.user.username
    comment.parentId = this.parentId
    if (this.comment) comment.postId = this.comment.postId

    this.postService.upsertComment(comment).subscribe(
      (info) => {
        this.reload.emit()
        this.commentForm.reset()
      },
      (error) => {
        this.errorMsg = error.error || error.error || "UNKNOWN_ERROR"
      },
      () => {
        setTimeout(() => {
          //this.stopLoading()
        }, 500)
      })
  }

  get f() {
    return this.commentForm.controls
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: '50vh',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
}
interface CommentData {
  comment: Comment
}