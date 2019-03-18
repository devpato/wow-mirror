import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeatherInfo();
  }

  getWeatherInfo() {
    this._weatherService.getDaysForecast().subscribe(res => {
      console.log(res);
    });
  }

}
