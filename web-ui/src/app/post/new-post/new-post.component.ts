import { User } from './../../../models/user';
import { CommonDialogComponent, DialogData } from './../../dialog/common-dialog/common-dialog.component';
import { PostService } from './../../../services/post.service';
import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  user: User
  postForm: FormGroup
  errorMsg: string

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<NewPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewPostData
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      content: [''],
    })
    this.user = this.data.user
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return
    }
    let post: Post = this.postForm.value
    post.username = this.user.username
    this.postService.upsert(post).subscribe(
      (info) => {
        this.openDialog()
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

  openDialog() {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: 'Success',
        msg: 'Create new post success'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close()
      //this.navigateToLoginForm.emit(true)
    });
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
interface NewPostData {
  user: User
}
