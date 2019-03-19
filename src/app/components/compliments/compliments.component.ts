import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-compliments",
  templateUrl: "./compliments.component.html",
  styleUrls: ["./compliments.component.scss"]
})
export class ComplimentsComponent implements OnInit {
  compliments: any;
  selectedCompliment: string;
  flag = true;
  counter = 0;
  constructor() {}

  ngOnInit() {
    this.buildDefaultCompliments();
    this.displayTimeCompliments();
  }

  buildDefaultCompliments() {
    this.compliments = {
      default: ["Hello Pato!"],
      morning: [
        "Good morning, Check your commute!",
        "Enjoy your day!",
        "How was your sleep?"
      ],
      afternoon: ["Yo!", "Where's Leon?", "Looking good today!"],
      evening: ["Wow, you look hot!", "You look nice!", "Code tonight?"]
    };
  }

  buildWeatherCompliments() {
    this.compliments = {
      day_sunny: ["Today is a sunny day", "It's a beautiful day"],
      snow: ["Snowball battle!"],
      rain: ["Don't forget your umbrella"]
    };
  }

  displayTimeCompliments() {
    this.selectedCompliment = this.compliments["default"][0];
    setInterval(() => {
      const time = new Date().getHours();
      console.log("enter");
      if (time >= 6 && time <= 11) {
        this.setComplimentWithTimer(this.compliments["morning"]);
      } else if (time >= 11 && time <= 18) {
        this.setComplimentWithTimer(this.compliments["afternoon"]);
      } else {
        this.setComplimentWithTimer(this.compliments["evening"]);
      }
    }, 5000);
  }

  setComplimentWithTimer(arr: string[]): void {
    if (this.counter !== arr.length) {
      this.selectedCompliment = arr[this.counter++];
    } else {
      this.counter = 0;
    }
  }
}
