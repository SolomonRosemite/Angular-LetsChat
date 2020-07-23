import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private eventEmitter: EventEmitterService
  ) {}

  email = '';
  password = '';
  userLocation = '';

  ngOnInit(): void {
    this.http.get('http://ip-api.com/json').subscribe((item: any) => {
      this.userLocation = `${item.city}, ${item.country}`;
    });
  }

  onKeyDown(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    this.auth
      .emailSignin(this.email, this.password)
      .then(() => {
        this.router.navigate(['chat']);
      })
      .catch((reason) => {
        this.eventEmitter.showDialog(
          'Invalid Sign In',
          "The Email Or Password dosent't seem to be right. Please Try Agian."
        );
      });
  }

  googleSignin() {
    this.auth.googleSignin(this.userLocation).then(() => {
      this.router.navigate(['chat']);
    });
  }
}
