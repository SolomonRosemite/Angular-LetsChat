import { User } from './../../services/Models/user.model';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-add-messenger',
  templateUrl: './chat-add-messenger.component.html',
  styleUrls: ['./chat-add-messenger.component.scss'],
})
export class ChatAddMessengerComponent implements OnInit {
  constructor(private router: Router, private database: DatabaseService) {}

  currentSerach = '';

  allUsers: User[] = [];

  ngOnInit() {
    this.database.getAllUsers().then((users) => {
      this.allUsers = users;
    });
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

  public singleCategory(): User[] {
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
