import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';
import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';
import { FileReference } from 'src/app/services/Models/FileReference.model';

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

  me: User;

  user = new User({
    displayName: '',
    email: '',
    location: '',
    photoURL: '',
    uid: '',
  });

  sharedFiles: FileReference[] = [];

  ngOnInit(): void {
    if (this.user.displayName.length === 0) {
      this.auth.getUser().then((user) => {
        this.user = user;

        this.me = user;
        console.log(this.me);
      });
    }

    this.eventEmitter.onSelectedUser.subscribe((chatCardInfo: ChatCardInfo) => {
      let receiverUid = chatCardInfo.receiverUid;

      if (receiverUid === this.me.uid) {
        receiverUid = chatCardInfo.senderUid;
      }

      this.getUserInfo(receiverUid).then(async (user) => {
        this.user = user;

        this.sharedFiles = await this.database.getSharedFiles(
          chatCardInfo.chatId,
          this.me.uid
        );
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
}
