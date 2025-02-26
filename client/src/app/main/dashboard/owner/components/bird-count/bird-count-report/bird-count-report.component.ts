import { Component, Input } from "@angular/core";
import { ReportStatusEnum } from "app/main/dashboard/enums/report-status-enum";
import { BirdCountReportModel } from "app/main/dashboard/models/bird-count-report.model";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-bird-count-report",
  templateUrl: "./bird-count-report.component.html",
  styleUrls: ["./bird-count-report.component.scss"],
})
export class BirdCountReportComponent {
  @Input() fbz: string;
  @Input() year: string;
  @Input() data: any;
  @Input() user: UserModel;
  @Input() report: BirdCountReportModel;
  public creationDate: Date;
  public reportStatusEnum = ReportStatusEnum;

  constructor(private _service: CallApiService) {}

  ngOnInit() {
    this.creationDate = new Date();
  }
}
