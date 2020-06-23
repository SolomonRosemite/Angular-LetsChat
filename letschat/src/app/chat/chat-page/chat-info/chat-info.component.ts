import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/event-emitter.service';
import { User } from 'src/app/services/Models/user.model';
import { Observable } from 'rxjs/internal/Observable';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss'],
})
export class ChatInfoComponent implements OnInit {
  constructor(private auth: AuthService) {}

  testitem =
    'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
  tiles: Tile[] = [
    { text: this.testitem, cols: 2, rows: 2, color: 'lightblue' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightgreen' },
    { text: this.testitem, cols: 2, rows: 2, color: 'lightblue' },
  ];

  user = new User({ displayName: '', email: '', photoURL: '', uid: '' });

  async ngOnInit(): Promise<void> {
    if (this.user.displayName.length === 0) {
      this.user = await this.auth.getUser();
      console.log(this.user);
    }
  }
}
