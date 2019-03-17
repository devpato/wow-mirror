import { NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [MatBadgeModule, MatIconModule],
  exports: [MatBadgeModule, MatIconModule]
})
export class MaterialModule {}
