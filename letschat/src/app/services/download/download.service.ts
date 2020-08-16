import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  public download(url: string, enableCors = false) {
    if (enableCors == true) {
      let headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');

      return this.http.get(url, {
        responseType: 'blob',
        headers: headers,
      });
    }

    return this.http.get(url, {
      responseType: 'blob',
    });
  }
}
