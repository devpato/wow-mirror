import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reduce } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  API_KEY = '39dd6312d1d9c6ab34ba092ee65ffd29';
  LOCATION = 'Jacksonville,US';
  BASE_URL = 'http://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) { }

  getForecastWeather() {
     return this.http.get(this.BASE_URL + 'forecast?q=' + this.LOCATION + '&units=metric&appid=' + this.API_KEY);
  }

  getCurrentWeather() {
    return this.http.get(this.BASE_URL + 'weather?q=' + this.LOCATION + '&units=metric&appid=' + this.API_KEY);
  }
}
