import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss'],
})
export class ChatCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  test() {
    console.log('ok');
  }
}
