import { EventEmitterService } from 'src/app/event-emitter.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-html-template',
  templateUrl: './signup-html-template.component.html',
  styleUrls: ['./../AuthPage/authpage.component.scss'],
})
export class SignupHtmlTemplateComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private router: Router,
    public auth: AuthService
  ) {}

  validData = false;

  username = '';
  email = '';
  password = '';
  passwordConfirm = '';

  async ngOnInit() {
    let isLoggedIn: boolean;
    isLoggedIn = (await this.auth.getUser()) !== null;

    if (isLoggedIn) {
      this.router.navigate(['/chat']);
    }
  }

  public getColor(): string {
    return this.validData ? '#27AE60' : '#CD6155';
  }

  public setUsername(event): void {
    this.username = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  public setEmail(event): void {
    this.email = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  public setPassword(event): void {
    this.password = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  public setPasswordConfirm(event): void {
    this.passwordConfirm = event.target.value;
    this.validData = ValidateData.dataIsValid(
      this.username,
      this.email,
      this.password,
      this.passwordConfirm
    );
  }

  public summit(): void {
    if (!this.validData) {
      // Show Dialog
      this.eventEmitterService.showDialog('Invalid Data', ValidateData.reason);
    } else if (!this.SignupUser(this.email, this.password)) {
      // Show Dialog
      this.eventEmitterService.showDialog('Invalid Data', ValidateData.reason);
    }
  }

  private async SignupUser(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.auth.emailSignup(email, password);
      this.auth.updateUserData(user.user);
    } catch (e) {
      ValidateData.reason = String(e).toLowerCase().includes('password')
        ? `Password doesn't seem to be right.`
        : e;
      return false;
    }

    return true;
  }

  public googleSignin(): void {
    this.auth.googleSignin().then((item) => {
      this.router.navigate(['/chat']);
    });
  }
}

class ValidateData {
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

    if (username.includes('-')) {
      this.reason = `The Username can't have the dash "-" Character.`;
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
