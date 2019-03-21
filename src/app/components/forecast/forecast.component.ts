import { Component, OnInit } from "@angular/core";
import * as iconTable from "../../shared/const/icons";
import { WeatherService } from "src/app/shared/services/weather.service";
import { finalize } from "rxjs/operators";
import * as moment from "moment-timezone";
@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"]
})
export class ForecastComponent implements OnInit {
  currentTime: string;
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
            console.log(fc);
            this.forecast = this.getDaysForecast(fc);
          });
        })
      )
      .subscribe(cw => {
        // this.currentTime = new Date(cw["dt"] * 1000).getHours();

        const x = new Date(cw["dt"] * 1000);
        this.currentTime = moment
          .utc(x, "YYYY-MM-DD HH:mm:ss")
          .tz("America/New_York")
          .format("ha");
      });
  }

  getDaysForecast(forecast): any[] {
    return forecast["list"].reduce((acc, val) => {
      let TEMP_TIME = moment
        .utc(new Date(val["dt"] * 1000), "YYYY-MM-DD HH:mm:ss")
        .tz("America/New_York")
        .format("ha");
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
