import { Component, Input } from "@angular/core";
import { FishCatchModel } from "app/main/dashboard/models/fish-catch.model";
import { UserModel } from "app/models/user";

@Component({
  selector: "app-fish-catch-report",
  templateUrl: "./fish-catch-report.component.html",
  styleUrls: ["./fish-catch-report.component.scss"],
})
export class FishCatchReportComponent {
  @Input() fbz: string;
  @Input() year: string;
  @Input() data: FishCatchModel[];
  @Input() user: UserModel;
  public creationDate: Date;

  constructor() {}

  ngOnInit() {
    this.creationDate = new Date();
  }
}
