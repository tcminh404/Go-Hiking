import { GeoService } from './../../../services/geo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonDialogComponent } from 'src/app/dialog/common-dialog/common-dialog.component';
import { Location } from 'src/models/location';
import { User } from 'src/models/user';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {
  @Input() user: User
  @Input() parentId: string
  @Input() location: Location
  @Output() reload = new EventEmitter()
  @Output() cancel = new EventEmitter()
  locationForm: FormGroup
  errorMsg: string
  img: string
  loading = false

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private geoService: GeoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      lat: ['', Validators.compose([Validators.required])],
      lng: ['', Validators.compose([Validators.required])],
      offset: [''],
      address: [''],
      content: [''],
    })
  }

  ngOnChanges() {
    if (this.location) {
      this.locationForm.controls.lat.setValue(this.location.lat)
      this.f.lng.setValue(this.location.lng)
      this.f.address.setValue(this.location.address)
      this.f.content.setValue(this.location.content)
      this.img = this.location.img
    }
  }

  uploadFile(event) {
    console.log(event.target.files);
    if (this.img) this.postService.deleteFile(this.img).subscribe(info => this.img = null)
    this.postService.uploadFile(event.target.files[0]).subscribe(info => this.img = info)
  }

  onSubmit() {
    this.getLocation()
    if (this.locationForm.invalid) {
      return
    }
    let location: Location = this.locationForm.value
    location.username = this.user.username
    location.img = this.img
    location.parentId = this.parentId
    if (this.location) location.postId = this.location.postId
    this.postService.upsertLocation(location).subscribe(
      (info) => {
        this.openDialog()
      },
      (error) => {
        this.errorMsg = error.error || error.error || "UNKNOWN_ERROR"
      },
      () => {
        setTimeout(() => {
          this.stopLoading()
        }, 500)
      })
  }

  openDialog() {
    let msg = (this.location) ? 'Edit location success' : 'Create new location success';
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: 'Success',
        msg: msg
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.locationForm.reset()
      this.reload.emit()
    });
  }

  onCancel() {
    this.locationForm.reset()
    this.cancel.emit()
  }

  getLocation() {
    this.errorMsg = null
    if (this.f.lat.value == '' || this.f.lng.value == '') {
      this.errorMsg = "Input latitude and longitude to get address"
      return
    }
    console.log(this.f.offset.value)
    if (this.f.offset.value === null || this.f.offset.value === '') this.f.offset.setValue(0)
    this.geoService.decode(this.f.lat.value, this.f.lng.value, this.f.offset.value).subscribe(
      (info) => {
        this.f.address.setValue(info.address)
      },
      (error) => {
        this.errorMsg = error.msg || error.error.error || "UNKNOWN_ERROR"
        this.stopLoading()
      },
      () => {
        setTimeout(() => {
          this.stopLoading()
        }, 500)
      }
    )
  }

  get f() {
    return this.locationForm.controls
  }
  private startLoading() {
    this.loading = true
  }
  private stopLoading() {
    this.loading = false
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
