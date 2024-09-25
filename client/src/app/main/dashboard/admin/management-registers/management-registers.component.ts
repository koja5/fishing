import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";

@Component({
  selector: "app-management-registers",
  templateUrl: "./management-registers.component.html",
  styleUrls: ["./management-registers.component.scss"],
})
export class ManagementRegistersComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "management-registers.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
