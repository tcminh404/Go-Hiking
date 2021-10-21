import { PRIVATE } from 'src/constants/access-type';
import { CommonDialogComponent } from './../../dialog/common-dialog/common-dialog.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/auth/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private cookie: AuthCookieService,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.user = {
      id: null,
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      roles: null,
      access: PRIVATE
    }

    this.registerForm = this.formBuilder.group({
      username: [this.user.username, Validators.compose([Validators.required])],
      password: [this.password, Validators.compose([Validators.required])],
      repassword: ['', Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.email])],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName]
    }, { validators: [this.validate] })
    this.f.username.setValue(this.cookie.username)
    this.f.password.setValue(this.cookie.password)
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/'
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return
    }
    let user = Object.assign({}, this.registerForm.getRawValue())
    user.access = PRIVATE
    this.startLoading()
    this.preprocessData()
    this.errorMsg = null
    let password = user.password
    this.userService.add(user, password).subscribe(
      (info) => {
        this.openDialog()
      },
      (error) => {
        this.errorMsg = error.error.message || error.error.error || "UNKNOWN_ERROR"
        this.stopLoading()
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

  validate(control: AbstractControl): ValidationErrors | null {
    if (control) {
      const password = control.get('password')?.value;
      const repassword = control.get('repassword')?.value;
      if (password !== repassword) {
        control.get('repassword')?.setErrors({ mustMatch: true });
        return ({ mustMatch: true });
      } else {
        control.get('repassword')?.setErrors(null);
      }
    }
    return null;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: 'Success',
        msg: 'Complete register'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.navigateToLoginForm.emit(true)
    });
  }
}
