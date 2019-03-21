import { Component, OnInit } from "@angular/core";
import { WeatherService } from "src/app/shared/services/weather.service";
import { pipe } from "rxjs";
import * as iconTable from "../../shared/const/icons";
import * as moment from "moment-timezone";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"]
})
export class WeatherComponent implements OnInit {
  currentTime: string;
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
      this.currentTime = moment
        .utc(new Date(cw["dt"] * 1000), "YYYY-MM-DD HH:mm:ss")
        .tz("America/New_York")
        .format("H");
      this.currentWeather = cw;
      this.wind = Math.round(this.currentWeather.wind.speed);
      this.sunrise = moment
        .utc(
          new Date(this.currentWeather.sys.sunrise * 1000),
          "YYYY-MM-DD HH:mm:ss"
        )
        .tz("America/New_York")
        .format("HH:mma");
      this.sunset = moment
        .utc(
          new Date(this.currentWeather.sys.sunset * 1000),
          "YYYY-MM-DD HH:mm:ss"
        )
        .tz("America/New_York")
        .format("HH:mma");
    });
  }
}
