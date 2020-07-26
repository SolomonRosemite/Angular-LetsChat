import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from './../../../services/Models/user.model';
import { Message } from './../../../services/Models/message.model';
import { Pipe, PipeTransform, Component, OnInit, NgZone } from '@angular/core';

import { DatePipe } from '@angular/common';

import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';
import * as firebase from 'firebase';

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
  currentSearch = '';
  user: User;

  ngOnInit(): void {
    this.eventEmitterService.onNewMessage.subscribe(
      async (messages: Message[]) => {
        if (!this.user) {
          this.user = await this.auth.getUser();
        }

        messages.forEach((msg) => {
          let addedItem = false;

          const date = this.getDate(msg.timestamp);

          for (let i = 0; i < this.chatCardsInfo.length; i++) {
            if (this.chatCardsInfo[i].chatId === msg.chatId) {
              addedItem = true;
              this.ngZone.run(() => {
                this.chatCardsInfo[i].latestMessage = msg.message;
                this.chatCardsInfo[i].date = date;
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
                  date: date,
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

  transform(value: any, format: string): string {
    return this.datepipe.transform(value, format);
  }

  setSearchValue(event): void {
    this.currentSearch = event.target.value.replace(/\s/g, '');
  }

  getDate(date: Date): string {
    if (this.dateIsToday(new Date(date))) {
      return this.transform(date, 'HH:mm');
    }

    return this.transform(date, 'HH:mm dd/MM/yyyy');
  }

  dateIsToday(date: Date): boolean {
    // Get today's date
    var todaysDate = new Date();

    // call setHours to take the time out of the comparison
    if (date.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  }

  public foundUsers(): ChatCardInfo[] {
    if (!this.chatCardsInfo) {
      return [];
    } else if (this.currentSearch.length === 0) {
      return this.chatCardsInfo;
    } else {
      return this.chatCardsInfo.filter((u) =>
        u.displayName
          .toLocaleLowerCase()
          .startsWith(this.currentSearch.toLocaleLowerCase())
      );
    }
  }
}
