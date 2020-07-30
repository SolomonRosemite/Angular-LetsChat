import { DatePipe } from '@angular/common';
import { WeatherService } from './../../services/weather/weather.service';
import { Component, OnInit, HostListener } from '@angular/core';

import { WeatherStatus } from './../../services/Models/weather.model';
import { User } from 'src/app/services/Models/user.model';

@Component({
  selector: 'app-weather-status',
  templateUrl: './weather-status.component.html',
  styleUrls: ['./weather-status.component.scss'],
})
export class WeatherStatusComponent implements OnInit {
  constructor(private weatherService: WeatherService, private pipe: DatePipe) {}

  weatherStatus: WeatherStatus = this.initWeatherStatus();
  screenHeight: any;
  name = '';

  updateTrigger = false;

  async ngOnInit(): Promise<void> {
    this.screenHeight = window.innerHeight - 150;

    const weather = await this.weatherService.getWeather();

    weather[0].subscribe((response: any) => {
      this.weatherStatus = {
        city: response.name,
        sunrise: this.weatherService.convertTime(response.sys.sunrise),
        temperature: response.main.temp,
        wind: response.wind.speed,
        image: this.weatherService.getImage(response.weather[0].icon),
      };
    });

    this.name = (weather[1] as User).displayName;
    this.loop();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - 150;
  }

  initWeatherStatus(): WeatherStatus {
    return {
      city: '',
      image: 'emptyImage.png',
      sunrise: '',
      temperature: '',
      wind: '',
    };
  }

  getFormattedDate(updateTrigger: boolean): string {
    return this.pipe.transform(new Date(), 'EEEE h:mm a');
  }

  // Makes sure that the time is always current
  async loop(): Promise<void> {
    await this.delay(1000 * 5);

    this.updateTrigger = !this.updateTrigger;
    this.loop();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getTime(): string {
    const hours = new Date().getHours();

    if (hours > 3 && hours <= 12) {
      return 'Morning';
    } else if (hours > 12 && hours < 20) {
      return 'Afternoon';
    }

    return 'Night';
  }
}
