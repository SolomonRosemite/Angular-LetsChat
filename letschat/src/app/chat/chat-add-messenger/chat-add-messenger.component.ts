import { EventEmitterService } from './../../services/event/event-emitter.service';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../services/Models/user.model';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMessengerDialogComponent } from './add-messenger-dialog/add-messenger-dialog.component';

@Component({
  selector: 'app-chat-add-messenger',
  templateUrl: './chat-add-messenger.component.html',
  styleUrls: ['./chat-add-messenger.component.scss'],
})
export class ChatAddMessengerComponent implements OnInit {
  constructor(
    private router: Router,
    private database: DatabaseService,
    public dialog: MatDialog,
    private auth: AuthService,
    private eventEmitter: EventEmitterService
  ) {}

  currentSearch = '';
  allUsers: User[] = [];
  user: User;

  ngOnInit() {
    this.auth.getUser().then((user) => (this.user = user));

    this.database.getAllUsers().then((users) => (this.allUsers = users));
  }

  goBack(): void {
    this.router.navigate(['/chat']);
  }

  refresh(): void {
    this.allUsers = [];

    this.database.getAllUsers().then((users) => {
      this.allUsers = users;
    });
  }

  onKey(event) {
    this.currentSearch = event.target.value;
  }

  openDialog(user: User): void {
    if (user.uid == this.user.uid) {
      this.eventEmitter.showDialog(
        'Nice try',
        "Well... I'm sorry but you sadly can't text your Self"
      );
    } else {
      this.dialog.open(AddMessengerDialogComponent, {
        data: [user, this.user],
      });
    }
  }

  public foundUsers(): User[] {
    if (!this.allUsers) {
      return [];
    } else if (this.currentSearch.length === 0) {
      return this.allUsers;
    } else {
      return this.allUsers.filter((u) =>
        u.displayName
          .toLocaleLowerCase()
          .startsWith(this.currentSearch.toLocaleLowerCase())
      );
    }
  }
}
