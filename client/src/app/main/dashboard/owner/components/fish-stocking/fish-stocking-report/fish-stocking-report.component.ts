import { Component, Input } from "@angular/core";
import { FishStockingReportEnum } from "app/main/dashboard/enums/fish-stocking-enum";
import { FishStockingModel } from "app/main/dashboard/models/fish-stocking-model";
import { FishStockingReportModel } from "app/main/dashboard/models/fish-stocking-report-module";
import { UserModel } from "app/models/user";

@Component({
  selector: "app-fish-stocking-report",
  templateUrl: "./fish-stocking-report.component.html",
  styleUrls: ["./fish-stocking-report.component.scss"],
})
export class FishStockingReportComponent {
  @Input() fbz: string;
  @Input() year: string;
  @Input() data: FishStockingModel[];
  @Input() report: FishStockingReportModel;
  @Input() user: UserModel;
  public creationDate: Date;
  public columnWidth: string;
  public fishStockingReportEnum = FishStockingReportEnum;

  constructor() {}

  ngOnInit() {
    this.creationDate = new Date();
    console.log(this.year);
    this.columnWidth = 100 / 7 + "%";
  }

  getNextYear() {
    return Number(this.year) + 1;
  }
}
