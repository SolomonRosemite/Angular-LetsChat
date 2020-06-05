import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './../AuthPage/authpage.component.html',
  styleUrls: ['./../AuthPage/authpage.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    const data: Data = this.route.snapshot.data;
    console.log(data);
  }

  ngOnInit(): void {}
}
