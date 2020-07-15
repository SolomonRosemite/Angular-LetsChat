import { Message } from './../../services/Models/message.model';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private database: DatabaseService,
    private auth: AuthService,
    public datepipe: DatePipe
  ) {}

  message = '';

  ngOnInit(): void {}

  async sendMessage(event): Promise<void> {
    if (event != null && event.keyCode !== 13) {
      return;
    }

    const user = await this.auth.getUser();

    // todo: adjust here
    const message = new Message({
      chatId: '1234',
      date: this.toDateTime(Date.now()),
      message: this.message,
      receiver: '0T5Tcxi2OUfXKvJdcom3psJG5uK2',
      sender: user.uid,
    });
    this.message = '';

    this.database.sendMessage(message);

    this.eventEmitterService.sendMessage(message);
  }

  toDateTime(date: number): string {
    return this.datepipe.transform(date, 'dd.MM.yyyy');
    // todo: add hour min and sec
  }
}
