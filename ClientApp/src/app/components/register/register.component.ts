import {Component, OnInit} from '@angular/core';
import {RegisterModel} from '../../core/services/security.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public register: RegisterModel = <RegisterModel>{};

  constructor() {
  }

  ngOnInit(): void {
  }

  registerUser() {
    console.log(`Resgister user will be ${this.register}`);
  }
}
