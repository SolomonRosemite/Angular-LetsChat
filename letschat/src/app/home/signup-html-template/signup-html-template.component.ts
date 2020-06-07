import { BackendServiceService } from './../../services/backend/backend-service.service';
import { EventEmitterService } from 'src/app/event-emitter.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup-html-template',
  templateUrl: './signup-html-template.component.html',
  styleUrls: ['./../AuthPage/authpage.component.scss'],
})
export class SignupHtmlTemplateComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private backend: BackendServiceService,
    public auth: AuthService
  ) {}

  validData = false;

  username = '';
  email = '';
  password = '';
  passwordConfirm = '';

  ngOnInit(): void {}

  getColor(): string {
    return this.validData ? '#27AE60' : '#CD6155';
  }

  setUsername(event): void {
    this.username = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  setEmail(event): void {
    this.email = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  setPassword(event): void {
    this.password = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  setPasswordConfirm(event): void {
    this.passwordConfirm = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  summit(): void {
    if (
      this.validData &&
      this.signUp(
        this.username,
        this.email,
        this.password,
        this.passwordConfirm
      )
    ) {
      // SignUp User
      this.backend.getData('users').subscribe((item) => {
        console.log(item);
      });
    } else {
      // Show Dialog
      this.eventEmitterService.showDialog('Invalid Data', ValidateData.reason);
    }
  }

  signUp(
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): boolean {
    return true;
  }

  googleLogin(): void {}
}

class ValidateData {
  constructor() {}

  static reason = 'Please fill the form to proceed.';

  public static dataIsValid(
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): boolean {
    // Username Validation
    if (username.length < 2) {
      this.reason = `The Username "${username}" is too short.`;
      return false;
    } else if (username.length > 20) {
      this.reason = `The Username "${username}" is too long.`;
      return false;
    }

    // Email Validation
    if (!email.includes('@') || !email.includes('.')) {
      this.reason = `The Email "${email}" is not valid.`;
      return false;
    }

    // Passwords Validation
    if (password.length < 6) {
      this.reason = 'The Password has to be at least 6 characters long.';
      return false;
    }

    if (password !== passwordConfirm) {
      this.reason = 'The Passwords are not Equal.';
      return false;
    }

    return true;
  }
}
