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

  ngOnInit() {
    this.database.getData('users').subscribe((item) => {
      console.log(item);
    });
  }
}
