import { WeatherService } from './../../services/weather/weather.service';
import { Component, OnInit, HostListener } from '@angular/core';

import { WeatherStatus } from './../../services/Models/weather.model';

@Component({
  selector: 'app-weather-status',
  templateUrl: './weather-status.component.html',
  styleUrls: ['./weather-status.component.scss'],
})
export class WeatherStatusComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  weatherStatus: WeatherStatus = this.initWeatherStatus();

  public screenHeight: any;

  async ngOnInit(): Promise<void> {
    this.screenHeight = window.innerHeight - 150;

    const weather = (await this.weatherService.getWeather()).subscribe(
      (response: any) => {
        this.weatherStatus = {
          city: response.name,
          sunrise: this.weatherService.convertTime(response.sys.sunrise),
          temperature: response.main.temp,
          wind: response.wind.speed,
          image: this.weatherService.getImage(response.weather.description),
        };
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - 150;
  }

  initWeatherStatus(): WeatherStatus {
    return {
      city: '',
      image: '',
      sunrise: '',
      temperature: '',
      wind: '',
    };
  }
}
