import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-fish-stocking-reports",
  templateUrl: "./all-fish-stocking-reports.component.html",
  styleUrls: ["./all-fish-stocking-reports.component.scss"],
})
export class AllFishStockingReportsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-fish-stocking-reports.json";
}
