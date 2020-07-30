import { DatabaseService } from './../database/database.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { WeatherStatus } from '../Models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  private apiKey = '7de3f60e04a40a806d51ab3444fe7126';

  async getWeather(location?: string): Promise<Observable<Object>> {
    if (!location) {
      location = (await this.auth.getUser()).location;
    }

    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}&units=metric`
    );
  }

  public convertTime(unixTime): string {
    let dt = new Date(unixTime * 1000);
    let h = dt.getHours();
    let m = '0' + dt.getMinutes();
    let t = h + ':' + m.substr(-2);
    return t;
  }

  // TODO: Get corresponding to the description
  public getImage(description: string): string {
    return '...';
  }
}
