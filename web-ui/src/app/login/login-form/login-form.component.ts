import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {
  @Output() navigateToRegisterForm = new EventEmitter<boolean>()

  loginForm: FormGroup
  hide = true

  loading = false
  submitted = false
  errorMsg: String
  returnUrl: String

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private cookie: AuthCookieService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
    this.f.username.setValue(this.cookie.username)
    this.f.password.setValue(this.cookie.password)
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/'
  }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    }
    this.startLoading()
    this.errorMsg = null
    this.auth.login(this.f.username.value, this.f.password.value).subscribe(
      (info) => {
        this.router.navigate([this.returnUrl])
      },
      (error) => {
        if (error.status === 400) {
          this.errorMsg = 'Username or Password is incorrect'
        } else {
          this.errorMsg = error.msg || error.error.error || "UNKNOWN_ERROR"
        }
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
    return this.loginForm.controls
  }
  private startLoading() {
    this.loading = true
  }
  /** stop form loading status */
  private stopLoading() {
    this.loading = false
  }
  onNavigateToRegisterForm() {
    this.navigateToRegisterForm.emit(true)
  }

}
