import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  time: string;
  date: Date;
  constructor() { }

  ngOnInit() {
    this.buildDate();
  }

  buildDate() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
