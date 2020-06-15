import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-chats',
  templateUrl: './open-chats.component.html',
  styleUrls: ['./open-chats.component.scss'],
})
export class OpenChatsComponent implements OnInit {
  constructor() {}

  search = ''; // TODO: Fix Font in the Html

  ngOnInit(): void {}

  setSearchValue(event): void {
    this.search = event.target.value.replace(/\s/g, '');
  }
}
