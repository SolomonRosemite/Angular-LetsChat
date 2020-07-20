import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../services/Models/user.model';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  displayName: string;
  location: string;
  photoURL: string;
}

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
    private auth: AuthService
  ) {}

  currentSerach = '';
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
    this.database.getAllUsers().then((users) => {
      this.allUsers = users;
    });
  }

  onKey(event) {
    this.currentSerach = event.target.value;
  }

  openDialog(user: User): void {
    console.log(user);

    this.dialog.open(DialogOverview, {
      data: {
        displayName: user.displayName,
        location: user.location,
        photoURL: user.photoURL,
      },
    });
  }

  public foundUsers(): User[] {
    if (!this.allUsers) {
      return [];
    } else if (this.currentSerach.length === 0) {
      return this.allUsers;
    } else {
      return this.allUsers.filter((u) =>
        u.displayName
          .toLocaleLowerCase()
          .startsWith(this.currentSerach.toLocaleLowerCase())
      );
    }
  }
}
@Component({
  selector: 'app-dialog-overview',
  styleUrls: ['./chat-add-messenger.component.scss'],
  templateUrl: 'dialog-overview.html',
})
export class DialogOverview {
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
  }

  location(): string {
    return this.data.location.length !== 0
      ? `Location ${this.data.location}`
      : '';
  }

  message(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
