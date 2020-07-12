import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Component, OnInit, NgZone } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/services/Models/user.model';

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

  async ngOnInit(): Promise<void> {
    const isLoggedIn = (await this.auth.getUser()) !== null;

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
      this.eventEmitterService.showDialog('Invalid Data', ValidateData.reason);
    } else {
      this.SignupUser(this.email, this.password, this.username).then(
        (response) => {
          console.log(response);
          if (response === false) {
            this.eventEmitterService.showDialog(
              'Invalid Data',
              ValidateData.reason
            );
          } else {
            this.router.navigate(['/chat']);
          }
        }
      );
    }
  }

  nav() {
    this.router.navigate(['/chat']);
  }

  private async SignupUser(
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> {
    try {
      const loggedInUser = await this.auth.emailSignup(email, password);

      const user = {
        displayName,
        photoURL:
          'https://2.bp.blogspot.com/-AJzdXki63Xc/UgI-8JY3uII/AAAAAAAACJk/85pnDqadUwQ/s1600/facebook-profile.jpg',
        email: loggedInUser.user.email,
        uid: loggedInUser.user.uid,
      };

      this.auth.updateUserData(user);
    } catch (e) {
      ValidateData.reason = String(e).toLowerCase().includes('password')
        ? `Password doesn't seem to be right.`
        : e;
      return false;
    }

    return true;
  }

  public googleSignin(): void {
    this.auth.googleSignin().then(() => {
      this.router.navigate(['chat']);
    });
  }

  public goBack(): void {
    this.router.navigate(['/']);
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
