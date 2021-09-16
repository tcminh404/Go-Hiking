import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginFormDisplay = true
  isRegisterFormDisplay = false

  constructor() { }

  ngOnInit() {
    this.isLoginFormDisplay = true
    this.isRegisterFormDisplay = false
  }

  navigateToRegisterForm() {
    this.isLoginFormDisplay = false
    this.isRegisterFormDisplay = true
  }

  navigateToLoginForm() {
    this.isLoginFormDisplay = true
    this.isRegisterFormDisplay = false
  }

}
