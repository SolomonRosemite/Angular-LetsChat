import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { User } from 'src/app/services/Models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Input()
  info: ChatCardInfo;

  last: ChatCardInfo;

  constructor(
    private eventEmitterService: EventEmitterService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.eventEmitterService.onSelectedUser.subscribe((info: ChatCardInfo) => {
      this.last = info;
    });
  }

  selectedUser(): void {
    if (this.info) {
      if (this.last && this.last === this.info) {
        return;
      }

      this.eventEmitterService.onUserSelectedOnChatPage(this.info);
    }
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

  transform(value: any, format: string): string {
    return this.datepipe.transform(value, format);
  }

  getDate(date: Date): string {
    if (this.dateIsToday(new Date(date))) {
      return this.transform(date, 'HH:mm');
    }

    return this.transform(date, 'dd.MM.yyyy');
  }

  shortMessage(message: string): string {
    if (message.length < 20) {
      return message;
    }

    return message.substring(0, 20) + '...';
  }
}
