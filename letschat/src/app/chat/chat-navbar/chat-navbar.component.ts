import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../services/Models/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.scss'],
})
export class ChatNavbarComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  me = new User({
    displayName: '',
    email: '',
    location: '',
    photoURL: '',
    uid: '',
  });

  currentUser: string;
  lastSeen: string;

  public async getDisplayname(): Promise<string> {
    return (await this.auth.getUser()).displayName;
  }

  async ngOnInit() {
    this.me = await this.auth.getUser();
  }

  public updateCurrentUser(user: User): void {
    this.currentUser = user.displayName;
    this.lastSeen = new Date().toDateString();
  }

  openSettings(): void {
    this.router.navigate(['/settings']);
  }

  goToLink(url: string): void {
    window.open(url);
  }
}
