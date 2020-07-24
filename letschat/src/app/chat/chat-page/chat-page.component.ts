import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';
import { Message } from './../../services/Models/message.model';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/services/Models/user.model';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private database: DatabaseService,
    private auth: AuthService
  ) {}

  me: User;
  receiver: ChatCardInfo;

  message = '';

  ngOnInit(): void {
    this.eventEmitterService.onSelectedUser.subscribe(
      (user: ChatCardInfo) => (this.receiver = user)
    );

    this.auth.getUser().then((user) => {
      this.me = user;

      const date = new Date().getTime();

      const messages = this.database.receiveMessages(this.me).ref;
      const query = messages.orderBy('timestamp').startAt(date);

      query.onSnapshot((items) => {
        let messages: Message[] = [];

        items.docChanges().forEach((element) => {
          const item = element.doc.data();

          messages.push({
            chatId: item.chatId,
            message: item.message,
            receiverDisplayName: item.receiverDisplayName,
            receiverPhotoURL: item.receiverPhotoURL,
            receiverUid: item.receiverUid,
            senderDisplayName: item.senderDisplayName,
            senderPhotoURL: item.senderPhotoURL,
            senderUid: item.senderUid,
            timestamp: (item.timestamp as firebase.firestore.Timestamp).toDate(),
          });
        });

        this.eventEmitterService.onNewMessageReceived(messages);
      });
    });
  }

  sendMessage(event): void {
    if (
      (event != null && event.keyCode != 13) ||
      !this.receiver ||
      this.message.length == 0
    ) {
      return;
    }

    let uid = this.receiver.senderUid;

    if (this.me.uid === this.receiver.senderUid) {
      uid = this.receiver.receiverUid;
    }

    const message = new Message({
      chatId: this.getChatId(this.me.uid, uid),
      message: this.message,

      receiver: uid,
      receiverPhotoURL: this.receiver.photoURL,
      receiverDisplayName: this.receiver.displayName,

      sender: this.me.uid,
      senderPhotoURL: this.me.photoURL,
      senderDisplayName: this.me.displayName,

      timestamp: new Date(),
    });

    this.finishMessage(message);
  }

  getChatId(uid1: string, uid2: string): string {
    return uid1.charAt(0) > uid2.charAt(0)
      ? `${uid1}-${uid2}`
      : `${uid2}-${uid1}`;
  }

  finishMessage(message: Message): void {
    this.message = '';

    this.database.sendMessage(message);
  }
}
