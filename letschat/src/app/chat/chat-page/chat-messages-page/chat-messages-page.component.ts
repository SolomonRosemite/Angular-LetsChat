import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Message } from 'src/app/services/Models/message.model';
import { User } from 'src/app/services/Models/user.model';
import { Component, OnInit, NgZone, Input } from '@angular/core';
import { templateSourceUrl } from '@angular/compiler';

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
  receiver: User;
  messages: Message[] = [];

  allMessages: Message[] = [];

  async ngOnInit(): Promise<void> {
    this.me = await this.auth.getUser();

    this.eventEmitterService.invokeUserSelectedOnChatPage.subscribe(
      (user: User) => {
        this.receiver = user;

        this.messages = [];

        this.allMessages.forEach((element) => {
          this.ngZone.run((): void => {
            // todo: Only add messages that are from this chat
            this.addMessage(element);
          });
        });
      }
    );

    this.eventEmitterService.onNewMessage.subscribe((items: Message[]) => {
      items.forEach((element) => {
        this.allMessages.push(element);
      });

      this.messages = [];

      if (this.receiver) {
        this.allMessages.forEach((element) => {
          this.ngZone.run((): void => {
            // todo: Only add messages that are from this chat
            this.addMessage(element);
          });
        });
      }
    });
  }

  // showMessages(): Message[] {
  //   let items: Message[] = [];

  //   this.messages.forEach((message) => {});

  //   return items;
  // }

  async addMessage(message: Message): Promise<void> {
    if (this.me == null) {
      this.me = await this.auth.getUser();
    }

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
