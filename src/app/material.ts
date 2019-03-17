import { NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  imports: [MatBadgeModule, MatIconModule, DragDropModule],
  exports: [MatBadgeModule, MatIconModule, DragDropModule]
})
export class MaterialModule {}
