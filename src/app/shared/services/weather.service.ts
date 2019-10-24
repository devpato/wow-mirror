import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { reduce } from "rxjs/operators";
import * as _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  API_KEY = "XXXXXXXX";
  LOCATION = "Jacksonville,US";
  BASE_URL = "https://api.openweathermap.org/data/2.5/";

  constructor(private http: HttpClient) {}

  getForecastWeather() {
    return this.http.get(
      this.BASE_URL +
        "forecast?q=" +
        this.LOCATION +
        "&units=metric&appid=" +
        this.API_KEY
    );
  }

  getCurrentWeather() {
    return this.http.get(
      this.BASE_URL +
        "weather?q=" +
        this.LOCATION +
        "&units=metric&appid=" +
        this.API_KEY
    );
  }
}
