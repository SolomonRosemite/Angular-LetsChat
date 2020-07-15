import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Message } from 'src/app/services/Models/message.model';
import { User } from 'src/app/services/Models/user.model';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-chat-messages-page',
  templateUrl: './chat-messages-page.component.html',
  styleUrls: ['./chat-messages-page.component.scss'],
})
export class ChatMessagesPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    public ngZone: NgZone
  ) {}
  messages: Message[] = [];
  me: User;

  firstRun = true;

  async ngOnInit(): Promise<void> {
    this.me = await this.auth.getUser();

    const date = new Date().getTime();

    const messages = this.database.receiveMessages(this.me).ref;
    const query = messages.orderBy('timestamp').startAt(date);

    this.ngZone.run(() => {
      query.onSnapshot((items) => {
        items.docChanges().forEach((element) => {
          this.ngZone.run((): void => {
            this.addMessage(element.doc.data() as Message);
          });
        });
      });
    });
  }

  async addMessage(message: Message): Promise<void> {
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
