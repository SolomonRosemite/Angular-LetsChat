import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private eventEmitter: EventEmitterService
  ) {}

  email = '';
  password = '';
  userLocation = '';

  locationPromise: Promise<Object>;

  ngOnInit(): void {
    const url = 'https://rosemite.herokuapp.com/api/location/';

    this.locationPromise = this.http.get(url).toPromise();
  }

  onKeyDown(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  async onSubmit(): Promise<void> {
    this.auth
      .emailSignin(this.email, this.password)
      .then(() => {
        this.router.navigate(['chat']);
      })
      .catch(() => {
        this.eventEmitter.showDialog(
          'Invalid Sign In',
          "The Email Or Password doesn't seem to be right. Please Try Again."
        );
      });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  resetPassword(): void {
    if (!this.email) {
      this.eventEmitter.showDialog(
        'Email Required',
        'The Email is Required to reset your Password.'
      );
      return;
    }
    this.auth
      .emailResetPassword(this.email)
      .then(() => {
        this.eventEmitter.showDialog(
          'Successful. Please check your Inbox',
          'A Email was send to you. Please check your Inbox to change your Password'
        );
      })
      .catch(() => {
        this.eventEmitter.showDialog(
          'Email not found',
          'Sorry the Email was not found. Please check if your Email is typed in correctly'
        );
      });
  }

  async googleSignin() {
    this.eventEmitter.showDialog('Please be Patient...', 'Just One Second.');
    const item = (await this.locationPromise) as any;

    this.userLocation = `${item.city}, ${item.country_name}`;

    await this.delay(200);

    this.eventEmitter.closeDialog();

    this.auth.googleSignin(this.userLocation).then(() => {
      this.router.navigate(['chat']);
    });
  }
}
