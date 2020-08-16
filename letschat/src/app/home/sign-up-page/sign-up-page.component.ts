import { StorageService } from './../../services/storage/storage.service';
import { WeatherService } from './../../services/weather/weather.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/services/Models/user.model';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EditProfileImageComponent } from '../user-settings/edit-settings/edit-profile-image/edit-profile-image.component';

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
    private eventEmitter: EventEmitterService,
    public dialog: MatDialog,
    private storage: StorageService
  ) {}

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  userLocation = '';

  locationPromise: Promise<Object>;

  async ngOnInit(): Promise<void> {
    const url = 'https://rosemite.herokuapp.com/api/location/';

    this.locationPromise = this.http.get(url).toPromise();
  }

  onKeyDown(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  // Validate Data
  onSubmit(): void {
    if (this.name.length < 2) {
      this.message('Name has to be at least 3 letters long.');
    } else if (this.name.length > 16) {
      this.message("Name can't be longer then 16 letters long.");
    } else if (this.password.length < 5) {
      this.message('Password has to be at least 6 Characters long.');
    } else if (this.password !== this.confirmPassword) {
      this.message("Passwords don't match.");
    } else {
      this.auth
        .emailSignup(this.email, this.password)
        .then(async (loggedInUser) => {
          const dialogRef = this.dialog.open(EditProfileImageComponent, {
            autoFocus: false,
            maxHeight: '90vh',
            data: { signUp: true, uid: loggedInUser.user.uid },
          });

          const result = await dialogRef.afterClosed().toPromise();

          let photoURL;

          if (result) {
            photoURL = await this.storage.updateProfilePicture(
              result[1],
              loggedInUser.user.uid
            );
          } else {
            photoURL = 'https://i.ibb.co/vPRXQtX/female-avatar.png';
          }

          const item = (await this.locationPromise) as any;

          this.userLocation = `${item.city}, ${item.country_name}`;

          const user: User = {
            displayName: this.name,
            photoURL: photoURL,
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

  message(message: string, title = 'Invalid Sign data'): void {
    this.eventEmitter.showDialog(title, message);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async googleSignin() {
    this.message('Please be Patient...', 'Just One Second.');

    const item = (await this.locationPromise) as any;

    this.userLocation = `${item.data.geo.region_name}, ${item.data.geo.country_name}`;

    await this.delay(200);

    this.eventEmitter.closeDialog();

    this.auth
      .googleSignin(this.userLocation)
      .then(() => {
        this.router.navigate(['chat']);
      })
      .catch();
  }
}
