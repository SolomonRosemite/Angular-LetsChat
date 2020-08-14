import { StorageService } from './../../../services/storage/storage.service';
import { EditProfileImageComponent } from './edit-profile-image/edit-profile-image.component';
import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { WeatherService } from './../../../services/weather/weather.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/services/Models/user.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss'],
})
export class EditSettingsComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private database: DatabaseService,
    private weatherService: WeatherService,
    private event: EventEmitterService,
    private storage: StorageService
  ) {}

  me = new User({
    displayName: 'Loading...',
    photoURL: '',
    location: 'Loading...',
    email: 'Loading...',
    uid: 'Loading...',
  });

  tempUser = new User({
    displayName: 'Loading...',
    photoURL: '',
    location: 'Loading...',
    email: 'Loading...',
    uid: 'Loading...',
  });

  file: File;

  ngOnInit(): void {
    this.auth.getUser().then((user) => {
      this.me = user;
      this.tempUser = user;
    });
  }

  updateImage(): void {
    const dialogRef = this.dialog.open(EditProfileImageComponent, {
      autoFocus: false,
      maxHeight: '90vh',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result[0]) {
          this.tempUser.photoURL = result[0];
          this.file = result[1];
        }
      }
    });
  }

  async save(): Promise<void> {
    if (
      (await this.weatherService.cityExists(this.tempUser.location)) === false
    ) {
      this.event.showDialog(
        'Invalid City',
        "It seems like this city doesn't exists."
      );
      return;
    }

    let photoURL;

    if (this.me.photoURL != this.tempUser.photoURL) {
      photoURL = await this.storage.updateProfilePicture(
        this.file,
        this.me.uid
      );
    }

    if (photoURL) {
      this.tempUser.photoURL = photoURL;
    }

    await this.database.updateUser(this.tempUser);
    this.router.navigate(['/settings']);
  }

  goBack(): void {
    this.router.navigate(['/settings']);
  }

  onKeyDisplayName(event): void {
    this.tempUser.displayName = event.target.value;
  }
  onKeyLocation(event): void {
    this.tempUser.location = event.target.value;
  }
}
