import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../../core/services/security.models';
import {SecurityService} from '../../core/services/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: LoginModel = <LoginModel>{};

  constructor(private securityService: SecurityService, private router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    this.securityService.login(this.login).subscribe(token => {
      this.router.navigate(['/tasks']);
    });
  }

}
