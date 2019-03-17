import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { AppComponent } from "./app.component";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
