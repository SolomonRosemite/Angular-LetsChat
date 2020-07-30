import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Message } from 'src/app/services/Models/message.model';
import { User } from 'src/app/services/Models/user.model';
import { WeatherStatus } from 'src/app/services/Models/weather.model';

@Component({
  selector: 'app-chat-messages-page',
  templateUrl: './chat-messages-page.component.html',
  styleUrls: ['./chat-messages-page.component.scss'],
})
export class ChatMessagesPageComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private auth: AuthService,
    public ngZone: NgZone
  ) {}

  me: User;
  receiver: ChatCardInfo;

  messages: Message[] = [];
  allMessages: Message[] = [];

  async ngOnInit(): Promise<void> {
    this.me = await this.auth.getUser();

    this.eventEmitterService.onSelectedUser.subscribe((user: ChatCardInfo) => {
      if (user === this.receiver) {
        return;
      }
      this.receiver = user;

      this.messages = [];

      this.allMessages.forEach((element) => {
        let uid = this.receiver.senderUid;
        if (this.receiver.senderUid === this.me.uid) {
          uid = this.receiver.receiverUid;
        }

        if (element.chatId.includes(uid)) {
          this.ngZone.run((): void => {
            this.addMessage(element);
          });
        }
      });
    });

    this.eventEmitterService.onNewMessage.subscribe((items: Message[]) => {
      items.forEach((element) => {
        this.allMessages.push(element);
      });

      this.messages = [];

      if (this.receiver) {
        this.allMessages.forEach((element) => {
          let uid = this.receiver.senderUid;
          if (this.receiver.senderUid === this.me.uid) {
            uid = this.receiver.receiverUid;
          }

          if (element.chatId.includes(uid)) {
            this.ngZone.run((): void => {
              this.addMessage(element);
            });
          }
        });
      }
    });
  }

  addMessage(message: Message): void {
    const length = this.messages.length;

    if (length === 0) {
      if (this.me.uid === message.senderUid) {
        message.class = 'chatBubble chatBubble--sent chatBubble--stop';
      } else {
        message.class = 'chatBubble chatBubble--rcvd chatBubble--stop';
      }
      this.messages.push(message);
      return;
    }

    if (this.me.uid === message.senderUid) {
      message.class = 'chatBubble chatBubble--sent chatBubble--stop';
      const last = length - 1;

      if (this.messages[last].senderUid === message.senderUid) {
        this.messages[last].class = 'chatBubble chatBubble--sent';
      }
    } else {
      message.class = 'chatBubble chatBubble--rcvd chatBubble--stop';
      const last = length - 1;

      if (this.messages[last].senderUid === message.senderUid) {
        this.messages[last].class = 'chatBubble chatBubble--rcvd';
      }
    }

    this.messages.push(message);
  }
}
