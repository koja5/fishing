import { Component, Input } from "@angular/core";
import { ObservationSheetReportEnum } from "app/main/dashboard/enums/observation-sheet-enum";
import { ObservationSheetModel } from "app/main/dashboard/models/observation-sheet-model";
import { ObservationSheetReportModel } from "app/main/dashboard/models/observation-sheet-report-model";
import { UserModel } from "app/models/user";

@Component({
  selector: "app-observation-sheet-report",
  templateUrl: "./observation-sheet-report.component.html",
  styleUrls: ["./observation-sheet-report.component.scss"],
})
export class ObservationSheetReportComponent {
  @Input() fbz: string;
  @Input() year: string;
  @Input() data: ObservationSheetModel[];
  @Input() user: UserModel;
  public creationDate: Date;
  public columnWidth: string;

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
