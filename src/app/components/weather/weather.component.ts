import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { pipe } from 'rxjs';
import * as iconTable from '../../shared/const/icons';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentTime: number;
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
    this._weatherService.getCurrentWeather().subscribe(cw => {
      this.currentTime = new Date(cw['dt'] * 1000).getHours();
      this.currentWeather = cw;
      this.wind = Math.round(this.currentWeather.wind.speed);
      this.sunrise = new Date(this.currentWeather.sys.sunrise * 1000);
      this.sunset = new Date(this.currentWeather.sys.sunset * 1000);
    });
  }
}
