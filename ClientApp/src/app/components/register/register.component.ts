import {Component, OnInit} from '@angular/core';
import {RegisterModel} from '../../core/services/security.models';
import {SecurityService} from '../../core/services/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public register: RegisterModel = <RegisterModel>{};

  constructor(private securityService: SecurityService, private router: Router) {
  }

  ngOnInit() {
  }

  registerUser() {
    console.log(`User: ${JSON.stringify(this.register)} will be registered!`);
    this.securityService.register(this.register).subscribe(token => {
      this.router.navigate(['/tasks']);
    });
  }
}
