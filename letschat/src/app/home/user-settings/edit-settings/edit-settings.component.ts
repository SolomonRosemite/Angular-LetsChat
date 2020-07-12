import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/services/Models/user.model';

@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss'],
})
export class EditSettingsComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  me = new User({
    displayName: 'Loading...',
    photoURL: '',
    email: 'Loading...',
    uid: 'Loading...',
  });

  tempUser: User;

  ngOnInit(): void {
    this.auth.getUser().then((user) => {
      this.me = user;
      this.tempUser = user;
    });
  }

  async save(): Promise<void> {
    // TODO
    await this.auth.updateUserData(this.me);
  }

  discard(): void {
    this.router.navigate(['/settings']);
  }

  goBack(): void {
    this.router.navigate(['/settings']);
  }
}
