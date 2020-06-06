import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './../AuthPage/signupauthpage.component.html',
  styleUrls: ['./../AuthPage/authpage.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
