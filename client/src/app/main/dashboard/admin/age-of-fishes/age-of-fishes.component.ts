import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-age-of-fishes",
  templateUrl: "./age-of-fishes.component.html",
  styleUrls: ["./age-of-fishes.component.scss"],
})
export class AgeOfFishesComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "age-of-fishes.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
