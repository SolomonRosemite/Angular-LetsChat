import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { User } from 'src/app/services/Models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  @Input()
  info: ChatCardInfo;

  last: ChatCardInfo;

  constructor(private eventEmitterService: EventEmitterService) {}

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

  shortMessage(message: string): string {
    if (message.length < 15) {
      return message;
    }

    return message.substring(0, 15) + '...';
  }
}
