import { Component, OnInit } from "@angular/core";
import * as iconTable from "../../shared/const/icons";
import { WeatherService } from "src/app/shared/services/weather.service";
import { finalize } from "rxjs/operators";
@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"]
})
export class ForecastComponent implements OnInit {
  currentTime: number;
  forecast = [];
  currentWeather: any;
  wind: number;
  sunset: Date;
  sunrise: Date;
  icons = iconTable;
  constructor(private _weatherService: WeatherService) {}

  ngOnInit() {
    this.startForecast();
  }

  getCurrentWeatherInfo() {
    this._weatherService
      .getCurrentWeather()
      .pipe(
        finalize(() => {
          this._weatherService.getForecastWeather().subscribe(fc => {
            this.forecast = this.getDaysForecast(fc);
          });
        })
      )
      .subscribe(cw => {
        this.currentTime = new Date(cw["dt"] * 1000).getHours();
      });
  }

  getDaysForecast(forecast): any[] {
    return forecast["list"].reduce((acc, val) => {
      const TEMP_TIME = Number(val["dt_txt"].split(" ")[1].substring(0, 2));
      if (
        TEMP_TIME === this.currentTime ||
        (TEMP_TIME >= this.currentTime && TEMP_TIME <= this.currentTime + 3)
      ) {
        acc.push(val);
      }
      return acc;
    }, []);
  }

  getDate(date: number) {
    return new Date(date * 1000);
  }

  startForecast() {
    this.getCurrentWeatherInfo();
    setInterval(() => {
      this.getCurrentWeatherInfo();
    }, 60 * 60 * 1000);
  }
}
