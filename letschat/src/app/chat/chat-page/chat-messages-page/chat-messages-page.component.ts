import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-messages-page',
  templateUrl: './chat-messages-page.component.html',
  styleUrls: ['./chat-messages-page.component.scss'],
})
export class ChatMessagesPageComponent implements OnInit {
  messages: Message[];
  constructor() {}

  message: string;

  ngOnInit(): void {
    this.messages = [
      {
        message: 'Hey, do you have to do homework for Math?',
        who: 'receiver',
      },
      {
        message: 'Sure.',
        who: 'me',
      },
      {
        message: 'I just send them. Check the Shared Files.',
        who: 'me',
      },
      {
        message: 'Thanks!😀',
        who: 'receiver',
      },
      {
        // tslint:disable-next-line: quotemark
        message: "You're Welcome.",
        who: 'me',
      },
    ];
  }

  public sendMessage(): void {
    console.log(this.message);
  }
}

interface Message {
  message: string;
  who: string;
}
