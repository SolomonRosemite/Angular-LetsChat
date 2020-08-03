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

  // todo: Add Scrolling to "Add Messenger" page but only when searching
  ngOnInit(): void {
    const url = 'https://letschat-fetch-location.herokuapp.com/';

    this.http.get(url).subscribe((item: any) => {
      this.userLocation = `${item.data.geo.region_name}, ${item.data.geo.country_name}`;
    });
  }

  onKeyDown(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    this.auth
      .emailSignin(this.email, this.password)
      .then(() => {
        this.router.navigate(['chat']);
      })
      .catch((reason) => {
        this.eventEmitter.showDialog(
          'Invalid Sign In',
          "The Email Or Password doesn't seem to be right. Please Try Again."
        );
      });
  }

  googleSignin() {
    this.auth.googleSignin(this.userLocation).then(() => {
      this.router.navigate(['chat']);
    });
  }
}
