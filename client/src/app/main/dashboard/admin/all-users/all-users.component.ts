import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CanComponentDeactivate } from "app/services/guards/dirtycheck.guard";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"],
})
export class AllUsersComponent implements CanComponentDeactivate {
  @ViewChild("grid") grid: DynamicGridComponent;
  
  public path = "grids/admin";
  public file = "all-users.json";

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
