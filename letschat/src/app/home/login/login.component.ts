import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './../AuthPage/signinauthpage.component.html',
  styleUrls: ['./../AuthPage/authpage.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private localrouter: Router) {
    this.router = localrouter.url;
  }
  router: string;

  ngOnInit(): void {}
}
