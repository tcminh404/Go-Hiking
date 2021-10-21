import { CommonDialogComponent } from './../../dialog/common-dialog/common-dialog.component';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ACCESS_TYPE, PRIVATE } from 'src/constants/access-type';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Output() navigateToLoginForm = new EventEmitter<boolean>()

  user: User
  password: string
  registerForm: FormGroup
  returnUrl: String
  hidePass = true
  hideRePass = true
  loading = false
  errorMsg: String
  submitted = false
  TYPES = ACCESS_TYPE

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private cookie: AuthCookieService,
    private userService: UserService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditProfileData
  ) { }

  ngOnInit() {
    this.user = {
      id: this.data.user.id,
      username: this.data.user.username,
      email: this.data.user.email,
      firstName: this.data.user.firstName,
      lastName: this.data.user.lastName,
      roles: this.data.user.roles,
      access: this.data.user.access
    }

    this.registerForm = this.formBuilder.group({
      username: [{ value: this.user.username, disabled: true }, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.email])],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      access: [this.user.access],
    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/'
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    let user = Object.assign({}, this.registerForm.getRawValue())
    user.id = this.user.id
    user.roles = this.user.roles
    this.startLoading()
    this.preprocessData()
    this.errorMsg = null
    this.userService.update(user).subscribe(
      (info) => {
        this.openDialog()
      },
      (error) => {
        this.errorMsg = error.error.message || error.error.error || "UNKNOWN_ERROR"
      },
      () => {
        setTimeout(() => {
          this.stopLoading()
        }, 500)
      }
    )
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  private preprocessData() {
    this.user.firstName = this.user.firstName.trim()
    this.user.lastName = this.user.lastName.trim()
    this.user.username = this.user.username.trim()
    this.user.email = this.user.email.trim()
  }
  private startLoading() {
    this.loading = true
  }
  /** stop form loading status */
  private stopLoading() {
    this.loading = false
  }
  onNavigateToLoginForm() {
    this.navigateToLoginForm.emit(true)
  }
  get f() {
    return this.registerForm.controls
  }

  openDialog() {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: 'Success',
        msg: 'Complete update profile'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close()
    });
  }

  onCancel() {
    this.dialogRef.close()
  }
}
interface EditProfileData {
  user: User
}