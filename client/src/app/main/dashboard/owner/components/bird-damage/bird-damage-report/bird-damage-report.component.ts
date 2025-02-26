import { Component, Input } from "@angular/core";
import { ReportStatusEnum } from "app/main/dashboard/enums/report-status-enum";
import { BirdDamageReportModel } from "app/main/dashboard/models/bird-damage-report.model";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-bird-damage-report",
  templateUrl: "./bird-damage-report.component.html",
  styleUrls: ["./bird-damage-report.component.scss"],
})
export class BirdDamageReportComponent {
  @Input() fbz: string;
  @Input() year: string;
  @Input() data: any;
  @Input() user: UserModel;
  @Input() report: BirdDamageReportModel;
  public creationDate: Date;
  public reportStatusEnum = ReportStatusEnum;

  constructor(private _service: CallApiService) {}

  ngOnInit() {
    this.creationDate = new Date();
  }

  getNextYear() {
    return Number(this.year) + 1;
  }

  getWildRegion(item, i: number) {
    return item["wild_region_" + i];
  }

  getHeron(item, i: number) {
    return item["heron_for_request_" + i];
  }

  getKormoran(item, i: number) {
    return item["kormoran_for_request_" + i];
  }

  getNameOfWater(item, i: number) {
    return item["name_of_water_" + i];
  }

  getHorse(item, i: number) {
    return item["horste_" + i];
  }

  getKormoranNest(item, i: number) {
    return item["kormoran_" + i];
  }
}
