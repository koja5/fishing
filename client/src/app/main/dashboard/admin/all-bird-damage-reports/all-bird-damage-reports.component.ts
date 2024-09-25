import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-all-bird-damage-reports",
  templateUrl: "./all-bird-damage-reports.component.html",
  styleUrls: ["./all-bird-damage-reports.component.scss"],
})
export class AllBirdDamageReportsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-bird-damage-reports.json";
}
