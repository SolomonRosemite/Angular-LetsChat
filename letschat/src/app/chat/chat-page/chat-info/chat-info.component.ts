import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { User } from 'src/app/services/Models/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss'],
})
export class ChatInfoComponent implements OnInit {
  constructor(private auth: AuthService) {}

  user = new User({ displayName: '', email: '', photoURL: '', uid: '' });

  ngOnInit(): void {
    if (this.user.displayName.length === 0) {
      this.auth.getUser().then((user) => {
        this.user = user;
        console.log(this.user);
      });
    }
  }
}
