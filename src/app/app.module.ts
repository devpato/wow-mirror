import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ClockComponent } from './components/clock/clock.component';
import { ComplimentsComponent } from './components/compliments/compliments.component';
import { NewsComponent } from './components/news/news.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from './components/forecast/forecast.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    ClockComponent,
    ComplimentsComponent,
    NewsComponent,
    TodoListComponent,
    WeatherComponent,
    ForecastComponent,
    MapComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
