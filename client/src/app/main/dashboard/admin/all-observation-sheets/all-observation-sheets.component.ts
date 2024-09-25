import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-observation-sheets",
  templateUrl: "./all-observation-sheets.component.html",
  styleUrls: ["./all-observation-sheets.component.scss"],
})
export class AllObservationSheetsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-observation-sheets.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
