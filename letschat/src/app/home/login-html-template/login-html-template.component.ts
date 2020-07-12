import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-html-template',
  templateUrl: './login-html-template.component.html',
  styleUrls: ['./../AuthPage/authpage.component.scss'],
})
export class LoginHtmlTemplateComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    public auth: AuthService,
    private router: Router
  ) {}

  validData = false;
  reason: string;
  buttonColor = '#27AE60';

  email = '';
  password = '';

  ngOnInit(): void {}

  setEmail(event): void {
    this.email = event.target.value;
    this.buttonColor = '#27AE60';
  }

  setPassword(event): void {
    this.password = event.target.value;
    this.buttonColor = '#27AE60';
  }

  async summit() {
    if ((await this.SigninUser(this.email, this.password)) !== true) {
      this.eventEmitterService.showDialog('Invalid Data', this.reason);
      this.buttonColor = '#CD6155';
    } else {
      this.router.navigate(['/chat']);
    }
  }

  async SigninUser(email: string, password: string): Promise<boolean> {
    try {
      await this.auth.emailSignin(email, password);
    } catch (e) {
      if (
        String(e)
          .toLowerCase()
          .includes(
            'there is no user record corresponding to this identifier.'.toLowerCase()
          )
      ) {
        this.reason = 'The Email does not exist.';
      } else if (String(e).toLowerCase().includes('password')) {
        this.reason = String(e).toLowerCase().includes('password')
          ? `Password doesn't seem to be right.`
          : e;
      } else {
        console.log(String(e).toLowerCase());
        this.reason = e;
      }
      return false;
    }

    return true;
  }

  public googleSignin() {
    this.auth.googleSignin().then((_) => {
      this.router.navigate(['chat']);
    });
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
