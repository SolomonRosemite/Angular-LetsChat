import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  constructor() {}

  displayname: string;
  message: string;
  lastSeen: string;
  imageUrl: string;

  ngOnInit(): void {
    const result = Math.random();
    if (result > 0.1 && result < 0.2) {
      this.displayname = 'James';
      this.lastSeen = 'Online';
      this.message = 'I will be there.';
      this.imageUrl =
        'https://i.pinimg.com/originals/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg';
    } else if (result > 0.2 && result < 0.4) {
      this.displayname = 'Lessie';
      this.lastSeen = 'Fri';
      this.message = 'Hi';
      this.imageUrl =
        'https://i.pinimg.com/originals/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg';
    } else if (result > 0.4 && result < 0.8) {
      this.displayname = 'Jesse';
      this.lastSeen = 'Mon';
      this.message = 'You got the Homework?';
      this.imageUrl =
        'https://i.pinimg.com/originals/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg';
    } else {
      this.displayname = 'Jamie';
      this.lastSeen = 'Thu';
      this.message = 'Sure😘';
      this.imageUrl =
        'https://i.pinimg.com/originals/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg';
    }
  }
}
