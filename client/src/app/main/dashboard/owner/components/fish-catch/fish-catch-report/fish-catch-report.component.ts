import { Component, Input } from "@angular/core";
import { FishCatchReportEnum } from "app/main/dashboard/enums/fish-catch-enum";
import { FishCatchReportModel } from "app/main/dashboard/models/fish-catch-report-model";
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
  @Input() report: FishCatchReportModel;
  @Input() user: UserModel;
  public creationDate: Date;
  public fishCatchReportEnum = FishCatchReportEnum;

  constructor() {}

  ngOnInit() {
    this.creationDate = new Date();
  }

  getNextYear() {
    return Number(this.year) + 1;
  }
}
