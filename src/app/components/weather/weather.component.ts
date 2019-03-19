import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as iconTable from '../../shared/const/icons';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentTime: number;
  forecast = [];
  currentWeather: any;
  wind: number;
  sunset: Date;
  sunrise: Date;
  icons = iconTable;
  constructor(private _weatherService: WeatherService) {}


  ngOnInit() {
    this.getCurrentWeatherInfo();
  }


  getCurrentWeatherInfo() {
    this._weatherService.getCurrentWeather()
     .pipe(
       finalize(() => {
        this._weatherService.getForecastWeather().subscribe(fc => {
          this.forecast = this.getDaysForecast(fc);
        });
       })).subscribe(cw => {
         this.currentTime = new Date(cw['dt'] * 1000).getHours();
         this.currentWeather = cw;
         this.wind = Math.round(this.currentWeather.wind.speed);
         this.sunrise = new Date(this.currentWeather.sys.sunrise * 1000);
         this.sunset = new Date(this.currentWeather.sys.sunset * 1000);
         console.log(cw);
       });
  }

  getDaysForecast(forecast): any[]  {
    return forecast['list'].reduce((acc, val) => {
      const TEMP_TIME = Number(val['dt_txt'].split(' ')[1].substring(0, 2 ));
      if ( TEMP_TIME === this.currentTime || (TEMP_TIME > TEMP_TIME && TEMP_TIME <= this.currentTime + 3)) {
         acc.push(val);
      }
      return acc;
    }, []);
  }

}
