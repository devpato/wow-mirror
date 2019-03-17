import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  dragged: boolean;
  constructor() {}

  ngOnInit() {}

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    this.dragged = true;
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev: any, id: string) {
    if (!document.getElementById(id).hasChildNodes()) {
      this.dragged = false;
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    } else {
      this.dragged = false;
    }
  }
}
