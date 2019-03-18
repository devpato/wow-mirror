import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  API_KEY = '39dd6312d1d9c6ab34ba092ee65ffd29';
  LOCATION = 'Jacksonville,US';
  BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';

  constructor(private http: HttpClient) { }

  getWeather() {
     return this.http.get(this.BASE_URL + this.LOCATION + '&units=metric&appid=' + this.API_KEY);
  }

  getDaysForecast() {
    return this.getWeather().pipe(
        map(f => {
        f['list'].forEach(d => {
          d.dt_txt = d.dt_txt.substring(0, 10);
        });
          return _.groupBy(f['list'], 'dt_txt');
       })
     );
  }
}
