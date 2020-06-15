import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  constructor(private auth: AuthService) {}

  me = new User({
    displayName: 'Loading...',
    photoURL: '',
    email: 'Loading...',
    uid: 'Loading...',
  });

  async ngOnInit() {
    this.me = await this.auth.getUser();
  }

  async signOut() {
    await this.auth.signOut();
  }
}
