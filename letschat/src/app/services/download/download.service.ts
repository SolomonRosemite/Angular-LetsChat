import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  public download(url: string) {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }
}
