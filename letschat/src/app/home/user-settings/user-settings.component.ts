import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  me = new User({
    displayName: 'Loading...',
    photoURL: '',
    email: 'Loading...',
    uid: 'Loading...',
  });

  async ngOnInit() {
    this.me = await this.auth.getUser();
  }

  edit(): void {
    // TODO: Create Edit Page
    this.router.navigate(['/settings/edit']);
  }

  goBack(): void {
    this.router.navigate(['/chat']);
  }

  async signOut() {
    await this.auth.signOut();
  }
}
