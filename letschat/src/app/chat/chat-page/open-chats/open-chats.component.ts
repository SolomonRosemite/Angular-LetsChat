import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from './../../../services/Models/user.model';
import { Message } from './../../../services/Models/message.model';
import { Component, OnInit, NgZone } from '@angular/core';

import { DatePipe } from '@angular/common';

import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';

@Component({
  selector: 'app-open-chats',
  templateUrl: './open-chats.component.html',
  styleUrls: ['./open-chats.component.scss'],
})
export class OpenChatsComponent implements OnInit {
  constructor(
    private ngZone: NgZone,
    private eventEmitterService: EventEmitterService,
    private auth: AuthService,
    public datepipe: DatePipe
  ) {}

  chatCardsInfo: ChatCardInfo[] = [];
  search = '';
  user: User;

  ngOnInit(): void {
    this.eventEmitterService.onNewMessage.subscribe(
      async (messages: Message[]) => {
        if (!this.user) {
          this.user = await this.auth.getUser();
        }

        messages.forEach((msg) => {
          let addedItem = false;

          for (let i = 0; i < this.chatCardsInfo.length; i++) {
            if (this.chatCardsInfo[i].chatId === msg.chatId) {
              addedItem = true;
              this.ngZone.run(() => {
                this.chatCardsInfo[i].latestMessage = msg.message;
              });
              break;
            }
          }

          let displayName = msg.senderDisplayName;
          let photoURL = msg.senderPhotoURL;

          if (msg.senderUid === this.user.uid) {
            displayName = msg.receiverDisplayName;
            photoURL = msg.receiverPhotoURL;
          }

          if (addedItem !== true) {
            this.ngZone.run(() => {
              this.chatCardsInfo.push(
                new ChatCardInfo({
                  // date: msg.timestamp.getDate().toString(), // TODO here
                  date: '12.03.20', // TODO here
                  displayName: displayName,
                  latestMessage: msg.message,
                  chatId: msg.chatId,
                  photoURL: photoURL,
                  receiverUid: msg.receiverUid,
                  senderUid: msg.senderUid,
                })
              );
            });
          }
        });
      }
    );
  }

  setSearchValue(event): void {
    this.search = event.target.value.replace(/\s/g, '');
  }
}
