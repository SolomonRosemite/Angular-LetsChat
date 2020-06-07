import { EventEmitterService } from 'src/app/event-emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-html-template',
  templateUrl: './login-html-template.component.html',
  styleUrls: ['./../AuthPage/authpage.component.scss'],
})
export class LoginHtmlTemplateComponent implements OnInit {
  constructor(private eventEmitterService: EventEmitterService) {}

  validData = false;
  buttonColor = '#27AE60';

  email = '';
  password = '';

  ngOnInit(): void {}

  setEmail(event): void {
    this.email = event.target.value;
    this.buttonColor = '#27AE60';
  }

  setPassword(event): void {
    this.password = event.target.value;
    this.buttonColor = '#27AE60';
  }

  summit(): void {
    if (this.loginUser(this.email, this.password)) {
    } else {
      this.eventEmitterService.showDialog('Invalid Data', 'Reason...');
      this.buttonColor = '#CD6155';
    }
  }

  loginUser(email: string, password: string): boolean {
    console.log(email);
    console.log(password);

    return false;
  }
}
