import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-fish-catch-reports",
  templateUrl: "./all-fish-catch-reports.component.html",
  styleUrls: ["./all-fish-catch-reports.component.scss"],
})
export class AllFishCatchReportsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-fish-catch-reports.json";
}
