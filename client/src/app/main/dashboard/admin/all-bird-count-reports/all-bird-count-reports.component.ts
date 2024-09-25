import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-bird-count-reports",
  templateUrl: "./all-bird-count-reports.component.html",
  styleUrls: ["./all-bird-count-reports.component.scss"],
})
export class AllBirdCountReportsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-bird-count-reports.json";
}
