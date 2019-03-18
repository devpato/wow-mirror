import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentTime: number;
  forecast: [];
  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeatherInfo();
  }


  getCurrentWeatherInfo() {
    this._weatherService.getCurrentWeather()
     .pipe(
       finalize(() => {
        this._weatherService.getForecastWeather().pipe(finalize(() => {
          console.log(this.forecast);
        })).subscribe(fc => {
          this.forecast = this.getDaysForecast(fc);
        });
       })).subscribe(cw => {
         this.currentTime = new Date(cw['dt']).getHours();
       });
  }

  getDaysForecast(forecast): []  {
    return forecast['list'].reduce((acc, val) => {
      if (val['dt_txt'].split(' ')[1].substring(0, 2 ) == this.currentTime) {
         acc.push(val);
      }
      return acc;
    }, []);
  }

}
