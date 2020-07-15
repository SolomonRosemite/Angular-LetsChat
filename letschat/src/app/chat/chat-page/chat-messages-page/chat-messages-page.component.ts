import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { Message } from 'src/app/services/Models/message.model';
import { User } from 'src/app/services/Models/user.model';

@Component({
  selector: 'app-chat-messages-page',
  templateUrl: './chat-messages-page.component.html',
  styleUrls: ['./chat-messages-page.component.scss'],
})
export class ChatMessagesPageComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private auth: AuthService
  ) {}
  messages: Message[] = [];
  me: User;

  ngOnInit(): void {
    // this.messages = [
    //   {
    //     message: 'Hey, do you have to do homework for Math?',
    //     class: 'chatBubble chatBubble--rcvd chatBubble--stop',
    //     chatId: '...',
    //     date: new Date(),
    //     receiverUid: 'qzBWXBualqdXzrGlQ38sEM3dXxt2',
    //     senderUid: '1234',
    //   },
    //   {
    //     message: 'Sure',
    //     class: 'chatBubble chatBubble--sent chatBubble--stop',
    //     chatId: '...',
    //     date: new Date(),
    //     receiverUid: '1234',
    //     senderUid: 'qzBWXBualqdXzrGlQ38sEM3dXxt2',
    //   },
    //   {
    //     message: 'I just send them. Check the Shared Files.',
    //     class: 'chatBubble chatBubble--sent chatBubble--stop',
    //     chatId: '...',
    //     date: new Date(),
    //     receiverUid: '1234',
    //     senderUid: 'qzBWXBualqdXzrGlQ38sEM3dXxt2',
    //   },
    //   {
    //     message: 'Thanks!😀',
    //     class: 'chatBubble chatBubble--rcvd chatBubble--stop',
    //     chatId: '...',
    //     date: new Date(),
    //     receiverUid: 'qzBWXBualqdXzrGlQ38sEM3dXxt2',
    //     senderUid: '1234',
    //   },
    //   {
    //     // tslint:disable-next-line: quotemark
    //     message: "You're Welcome.",
    //     class: 'chatBubble chatBubble--sent chatBubble--stop',
    //     chatId: '...',
    //     date: new Date(),
    //     receiverUid: '1234',
    //     senderUid: 'qzBWXBualqdXzrGlQ38sEM3dXxt2',
    //   },
    // ];

    this.eventEmitterService.invokeSendMessageFunction.subscribe(
      (message: Message) => {
        this.addMessage(message);
      }
    );
  }

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
