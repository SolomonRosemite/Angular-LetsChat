import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-weather-status',
  templateUrl: './weather-status.component.html',
  styleUrls: ['./weather-status.component.scss'],
})
export class WeatherStatusComponent implements OnInit {
  constructor() {}

  public screenHeight: any;

  ngOnInit(): void {
    this.screenHeight = window.innerHeight - 150;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - 150;
  }
}
