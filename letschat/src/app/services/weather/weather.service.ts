import { DatabaseService } from './../database/database.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { WeatherStatus } from '../Models/weather.model';
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  private apiKey = '7de3f60e04a40a806d51ab3444fe7126';

  async getWeather(): Promise<any> {
    const user = await this.auth.getUser();

    return [
      this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=${this.apiKey}&units=metric`
      ),
      user,
    ];
  }

  public async cityExists(city: string): Promise<boolean> {
    try {
      await this.http
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
        )
        .toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }

  public convertTime(unixTime): string {
    let dt = new Date(unixTime * 1000);
    let h = dt.getHours();
    let m = '0' + dt.getMinutes();
    let t = h + ':' + m.substr(-2);
    return t;
  }

  public getImage(iconId: string): string {
    if (new Date().getHours() > 21 || new Date().getHours() <= 4) {
      iconId = iconId.substring(0, iconId.length - 1) + 'd';
      return `night/${iconId}.png`;
    }
    return `${iconId}.png`;
  }
}
