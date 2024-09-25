import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-fishes",
  templateUrl: "./all-fishes.component.html",
  styleUrls: ["./all-fishes.component.scss"],
})
export class AllFishesComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-fishes.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
