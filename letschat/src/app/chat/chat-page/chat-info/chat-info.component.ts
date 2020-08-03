import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';
import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';
import { FileReference } from 'src/app/services/Models/FileReference.model';

import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss'],
})
export class ChatInfoComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private eventEmitter: EventEmitterService,
    private database: DatabaseService,
    private datepipe: DatePipe
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
      this.sharedFiles = [];

      this.database
        .getSharedFilesReferences(chatCardInfo.chatId, this.me.uid)
        .onSnapshot((x) => {
          this.sharedFiles = [];
          x.docs.forEach((data) => {
            this.sharedFiles.push(data.data() as FileReference);
          });
        });

      let receiverUid = chatCardInfo.receiverUid;

      if (receiverUid === this.me.uid) {
        receiverUid = chatCardInfo.senderUid;
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

  getSharedFiles(): FileReference[] {
    return this.sharedFiles.sort((a, b) =>
      moment(this.transform(b.date), 'HH:mm dd.MM.yyyy').diff(
        moment(this.transform(a.date), 'HH:mm dd.MM.yyyy')
      )
    );
  }

  transform(value: any): string {
    const date = ((value as any) as firebase.firestore.Timestamp).toDate();

    return this.datepipe.transform(date, 'HH:mm dd.MM.yyyy');
  }
}
