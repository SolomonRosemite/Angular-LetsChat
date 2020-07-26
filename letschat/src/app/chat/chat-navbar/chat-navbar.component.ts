import { EventEmitterService } from './../../services/event/event-emitter.service';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../services/Models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.scss'],
})
export class ChatNavbarComponent implements OnInit {
  constructor(
    private eventEmitter: EventEmitterService,
    private database: DatabaseService,
    public auth: AuthService,
    private router: Router
  ) {}

  allUsers: User[] = [];

  me = new User({
    displayName: '',
    email: '',
    location: '',
    photoURL: '',
    uid: '',
  });

  currentUser: string;
  location: string;

  ngOnInit(): void {
    this.auth.getUser().then((user) => {
      this.me = user;
    });

    this.eventEmitter.onSelectedUser.subscribe((chatCardInfo: ChatCardInfo) => {
      let receiverUid = chatCardInfo.receiverUid;

      if (receiverUid === this.me.uid) {
        receiverUid = chatCardInfo.senderUid;
      }

      this.getUserInfo(receiverUid).then((user) => {
        this.currentUser = user.displayName;
        this.location = user.location;
      });
    });
  }

  async getUserInfo(uid: string, reloadUsers: boolean = false): Promise<User> {
    if (this.allUsers.length == 0 || reloadUsers == true) {
      this.allUsers = await this.database.getAllUsers();
    }

    const user = this.allUsers.filter((user) => user.uid == uid);
    if (user.length != 0) {
      return user[0];
    }

    return this.getUserInfo(uid, true);
  }

  routeTo(route: string): void {
    this.router.navigate([route]);
  }

  goToLink(url: string): void {
    window.open(url);
  }
}
