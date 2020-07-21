import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';
import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss'],
})
export class ChatInfoComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private eventEmitter: EventEmitterService,
    private database: DatabaseService
  ) {}

  allUsers: User[] = [];

  user = new User({
    displayName: '',
    email: '',
    location: '',
    photoURL: '',
    uid: '',
  });

  ngOnInit(): void {
    if (this.user.displayName.length === 0) {
      this.auth.getUser().then((user) => {
        this.user = user;
        console.log(this.user);
      });
    }

    this.eventEmitter.onSelectedUser.subscribe((user: ChatCardInfo) => {
      let receiverUid = user.receiverUid;

      if (receiverUid === this.user.uid) {
        receiverUid = user.senderUid;
      }

      this.getUserInfo(receiverUid).then((user) => (this.user = user));
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
}
