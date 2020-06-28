import { Message } from './../../services/Models/message.model';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/event-emitter.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private auth: AuthService
  ) {}

  count = 0;
  message = '';

  ngOnInit(): void {}

  async sendMessage(event): Promise<void> {
    if (event != null && event.keyCode !== 13) {
      return;
    }
    this.count++;

    if (this.count > 3) {
      const a = new Message({
        chatId: '1234',
        date: Date.now(),
        message: this.message,
        receiver: 'John uid',
        sender: '1234',
      });
      this.message = '';

      this.eventEmitterService.sendMessage(a);
      return;
    }

    const message = new Message({
      chatId: '1234',
      date: Date.now(),
      message: this.message,
      receiver: 'John uid',
      sender: (await this.auth.getUser()).uid,
    });
    this.message = '';

    this.eventEmitterService.sendMessage(message);
  }
}
