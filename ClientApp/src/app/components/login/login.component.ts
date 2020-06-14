import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../../core/services/security.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: LoginModel = <LoginModel> {};

  constructor() { }

  ngOnInit(): void {
  }

  loginUser() {
    console.log(`Login user : ${JSON.stringify(this.login)}`);
  }

}
