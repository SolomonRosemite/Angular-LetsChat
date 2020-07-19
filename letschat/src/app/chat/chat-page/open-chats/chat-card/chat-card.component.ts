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

  constructor(private eventEmitterService: EventEmitterService) {}

  ngOnInit(): void {}

  selectedUser(): void {
    if (this.info.receiverUid) {
      this.eventEmitterService.onUserSelectedOnChatPage(this.info.receiverUid);
    }
  }

  shortMessage(message: string): string {
    if (message.length < 24) {
      return message;
    }

    return message.substring(0, 24) + '...';
  }
}
