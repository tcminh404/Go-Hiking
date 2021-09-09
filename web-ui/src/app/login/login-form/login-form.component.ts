import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthCookieService } from 'src/services/auth/auth-cookie.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() navigateToForgotPassword = new EventEmitter<boolean>()

  loginForm: FormGroup

  loading = false
  submitted = false
  errorMsg: String
  returnUrl: String

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private routes: Router,
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

  }

  get f() {
    return this.loginForm.controls
  }

}
