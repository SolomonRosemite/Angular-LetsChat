import { Message } from './../../services/Models/message.model';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { DatePipe } from '@angular/common';
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
  user: User;
  currentReceiver: User;

  message = '';

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getUser();

    const date = new Date().getTime();

    const messages = this.database.receiveMessages(this.user).ref;
    const query = messages.orderBy('timestamp').startAt(date);

    query.onSnapshot((items) => {
      let messages: Message[] = [];

      items.docChanges().forEach((element) => {
        messages.push(element.doc.data() as Message);
      });

      this.eventEmitterService.onNewMessageReceived(messages);
    });
  }

  async sendMessage(event): Promise<void> {
    if (event != null && event.keyCode !== 13) {
      return;
    }

    // todo: temp data
    if (this.user.uid === '0T5Tcxi2OUfXKvJdcom3psJG5uK2') {
      var mySender = '0T5Tcxi2OUfXKvJdcom3psJG5uK2';
      var myReceiver: User = {
        displayName: 'Solomon Jesse',
        email: 'Hi',
        location: 'Berlin, Germany',
        photoURL:
          'https://www.thoughtco.com/thmb/w922nFq9tvm_XUvVA6c2kYDpemQ=/1414x1414/smart/filters:no_upscale()/businessman-taking-a-break-962669770-da1085e93dad4d5c9723795466c615e6.jpg',
        uid: 'YdydojqkxIS60B3q67hrO4KZR9i2',
      };
    } else {
      var mySender = 'YdydojqkxIS60B3q67hrO4KZR9i2';
      var myReceiver: User = {
        displayName: 'Solomon Jesse',
        email: 'Hi',
        location: 'Berlin, Germany',
        photoURL:
          'https://www.thoughtco.com/thmb/w922nFq9tvm_XUvVA6c2kYDpemQ=/1414x1414/smart/filters:no_upscale()/businessman-taking-a-break-962669770-da1085e93dad4d5c9723795466c615e6.jpg',
        uid: '0T5Tcxi2OUfXKvJdcom3psJG5uK2',
      };
    }

    // todo: adjust here
    const message = new Message({
      receiverDisplayName: myReceiver.displayName,
      receiverPhotoURL: myReceiver.photoURL,
      senderDisplayName: 'Solomon Rosemite',
      senderPhotoURL:
        'https://lh3.googleusercontent.com/a-/AOh14GgcE44KDpbMewHjBQpBiBVyrkjhTcXhCrkSfHNX',
      chatId: '1234',
      message: this.message,
      receiver: myReceiver.uid,
      sender: mySender,
      timestamp: new Date(),
      // receiver: '0T5Tcxi2OUfXKvJdcom3psJG5uK2',
      // sender: user.uid,
    });

    this.finishMessage(message);
  }

  finishMessage(message: Message): void {
    this.message = '';

    this.database.sendMessage(message);
  }
}
