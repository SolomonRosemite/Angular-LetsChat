import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from './../../../services/Models/user.model';
import { Message } from './../../../services/Models/message.model';
import { Component, OnInit, NgZone } from '@angular/core';

import * as moment from 'moment';

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

          // const date = this.getDate(msg.timestamp);
          const date = msg.timestamp;

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

  setSearchValue(event): void {
    this.currentSearch = event.target.value.replace(/\s/g, '');
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
      return this.sortByDate(this.chatCardsInfo);
    } else {
      return this.sortByDate(
        this.chatCardsInfo.filter((u) =>
          u.displayName
            .toLocaleLowerCase()
            .startsWith(this.currentSearch.toLocaleLowerCase())
        )
      );
    }
  }

  private sortByDate(chats: ChatCardInfo[]): ChatCardInfo[] {
    return chats.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
