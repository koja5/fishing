import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-origins",
  templateUrl: "./all-origins.component.html",
  styleUrls: ["./all-origins.component.scss"],
})
export class AllOriginsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-origins.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
