import { Component, OnInit } from "@angular/core";
import * as iconTable from "../../shared/const/icons";
import { WeatherService } from "src/app/shared/services/weather.service";
import { finalize } from "rxjs/operators";
import * as moment from "moment-timezone";
import * as _ from "lodash";
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
  currentDate: Date;
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

        this.currentDate = new Date(cw["dt"] * 1000);
        this.currentTime = moment
          .utc(this.currentDate, "YYYY-MM-DD HH:mm:ss")
          .tz("America/New_York")
          .format("Ha");
      });
  }

  getDaysForecast(forecast): any[] {
    const ct = parseInt(
      moment
        .utc(this.currentDate, "YYYY-MM-DD HH:mm:ss")
        .tz("America/New_York")
        .add(12, "hours")
        .format("H")
    );
    let TEMP_TIME;
    let TEMP_TIME_3;
    return forecast["list"].reduce((acc, val) => {
      TEMP_TIME = parseInt(
        moment
          .utc(new Date(val["dt"] * 1000), "YYYY-MM-DD HH:mm:ss")
          .tz("America/New_York")
          .format("H")
      );
      TEMP_TIME_3 = parseInt(
        moment
          .utc(new Date(val["dt"] * 1000), "YYYY-MM-DD HH:mm:ss")
          .tz("America/New_York")
          .add(3, "hours")
          .format("H")
      );
      //console.log(ct, TEMP_TIME, TEMP_TIME_3);
      if (ct >= TEMP_TIME && ct <= TEMP_TIME_3) {
        acc.push(val);
      }
      // console.log(acc);
      return acc.slice(0, 5);
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
