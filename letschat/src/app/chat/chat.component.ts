import { User } from './../services/Models/user.model';
import { Message } from './../services/Models/message.model';
import { AuthService } from './../services/auth/auth.service';
import { DatabaseService } from './../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private database: DatabaseService, public auth: AuthService) {}

  async ngOnInit() {
    const messages: Message[] = new Array();

    await this.database
      .receiveMessages(await this.auth.getUser())
      .toPromise()
      .then((newMessages) => {
        newMessages.forEach((item) => {
          messages.push(item.data() as Message);
        });
      });

    console.log(messages);
  }

  public async sendMessage() {
    const user1 = new User('Lia', 'Lia@gmail.com', 'Lia1234');
    const user2 = new User('Jesse', 'Jesse@gmail.com', 'Jesse1234');

    const message: Message = {
      chatId: `${user1.uid}-${user2.uid}`,
      date: new Date(),
      message: 'Hey. How u doin',
      sender: user1.displayName,
      receiver: user2.displayName,
    };

    this.database.sendMessage(await this.auth.getUser(), message);
  }
}
