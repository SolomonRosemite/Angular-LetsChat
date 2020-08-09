import { WeatherService } from './../../services/weather/weather.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/services/Models/user.model';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private eventEmitter: EventEmitterService
  ) {}

  gender: string;

  genders = [
    { value: 'female', viewValue: 'Female' },
    { value: 'male', viewValue: 'Male' },
    { value: 'other', viewValue: 'Other' },
  ];

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  userLocation = '';

  ngOnInit(): void {
    const url = 'https://rosemite.herokuapp.com/api/location/';

    this.http.get(url).subscribe((item: any) => {
      this.userLocation = `${item.data.geo.region_name}, ${item.data.geo.country_name}`;
    });
  }

  onKeyDown(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  getPhotoUrl(): string {
    if (!this.gender) {
      return 'https://i.ibb.co/1d8380F/other.png';
    }

    if (this.gender == 'other') {
      return 'https://i.ibb.co/1d8380F/other.png';
    }

    return this.gender === 'female'
      ? 'https://i.ibb.co/vPRXQtX/female-avatar.png'
      : 'https://i.ibb.co/qDMgB1y/male-avatar.png';
  }

  onSubmit(): void {
    // Validate Data
    if (this.name.length < 2) {
      this.message('Name has to be at least 3 letters long.');
    } else if (this.name.length > 12) {
      this.message("Name can't be longer then 12 letters long.");
    } else if (this.password.length < 5) {
      this.message('Password has to be at least 6 Characters long.');
    } else if (this.password !== this.confirmPassword) {
      this.message("Passwords don't match.");
    } else {
      this.auth
        .emailSignup(this.email, this.password)
        .then(async (loggedInUser) => {
          const user: User = {
            displayName: this.name,
            photoURL: this.getPhotoUrl(),
            location: this.userLocation,
            email: loggedInUser.user.email,
            uid: loggedInUser.user.uid,
          };

          await this.auth.setUserData(user);

          this.router.navigate(['chat']);
        })
        .catch((reason) => {
          const msg: string = reason.message;

          const alreadyUsed = 'The email address is already in use';

          if (msg.startsWith(alreadyUsed)) {
            this.message(alreadyUsed);
          } else if (msg.startsWith('The email address is badly')) {
            this.message("Email address isn't Valid");
          } else {
            this.message('Something went wrong. Please try again');
          }
        });
    }
  }

  message(message: string): void {
    this.eventEmitter.showDialog('Invalid Sign data', message);
  }

  googleSignin() {
    this.auth.googleSignin(this.userLocation).then(() => {
      this.router.navigate(['chat']);
    });
  }
}
