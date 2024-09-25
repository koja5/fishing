import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-observation-sheet",
  templateUrl: "./observation-sheet.component.html",
  styleUrls: ["./observation-sheet.component.scss"],
})
export class ObservationSheetComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/owner";
  public file = "observation-sheet.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
