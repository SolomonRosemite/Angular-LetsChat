import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
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
    private http: HttpClient
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
        console.log(reason);

        // Todo: Display Message: Email Or Password doesn't seem to be right. Try Agian Please
      });
  }

  googleSignin() {
    this.auth.googleSignin(this.userLocation).then(() => {
      this.router.navigate(['chat']);
    });
  }
}
