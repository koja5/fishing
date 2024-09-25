import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { FishStockingReportEnum } from "app/main/dashboard/enums/fish-stocking-enum";
import { ReportStatusEnum } from "app/main/dashboard/enums/report-status-enum";
import { BirdDamageReportModel } from "app/main/dashboard/models/bird-damage-report.model";
import { BirdDamageModel } from "app/main/dashboard/models/bird-damage.model";
import { FishStockingReportModel } from "app/main/dashboard/models/fish-stocking-report-module";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-bird-damage-report-details",
  templateUrl: "./bird-damage-report-details.component.html",
  styleUrls: ["./bird-damage-report-details.component.scss"],
})
export class BirdDamageReportDetailsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirmBackReport")
  dialogConfirmBackReport: DialogConfirmComponent;
  @ViewChild("dialogConfirmReminderOwner")
  dialogConfirmReminderOwner: DialogConfirmComponent;

  public path = "grids/admin";
  public file = "bird-damage-report-details.json";
  public data: any;
  public itemData: BirdDamageModel;
  public report = new BirdDamageReportModel();
  public REPORT_STATUS_ENUM = ReportStatusEnum;
  public userProfile = new UserModel();
  public ownerName: string;
  public loader = false;

  constructor(
    private _service: CallApiService,
    private _activatedRouter: ActivatedRoute,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.getDataForGrid();
    this.getReportStatus();
  }

  getDataForGrid() {
    this._service
      .callGetMethod(
        "/api/admin/getBirdDamageReportDetails?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  getReportStatus() {
    this._service
      .callGetMethod(
        "/api/admin/getBirdDamageReport?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data: BirdDamageReportModel) => {
        this.report = data;
        this.getUserProfile();
      });
  }

  getUserProfile() {
    this._service
      .callGetMethod("/api/admin/getUserProfile", this.report.id_owner)
      .subscribe((data: UserModel) => {
        this.userProfile = data;
      });
  }

  dialogConfirmBackReportShow() {
    this.dialogConfirmBackReport.showQuestionModal();
  }

  dialogConfirmReminderOwnerShow() {
    this.dialogConfirmReminderOwner.showQuestionModal();
  }

  reminderOwnerToCompleteReport() {
    this.loader = true;
    this._service
      .callPostMethod("/api/mail/reminderOwnerToCompleteBirdDamageReport", {
        fishStockingReport: this.report,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.report.status = ReportStatusEnum.draft;
          this._toastr.showSuccess();
        }
      });
  }

  backReportToOwner() {
    this.loader = true;
    this._service
      .callPostMethod("/api/admin/backBirdDamageReportToOwner", {
        report: this.report,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.report.status = ReportStatusEnum.draft;
          this._toastr.showSuccess();
        }
      });
  }

  emitValueForCustomForm(event: BirdDamageModel) {
    if (event) {
      this.itemData = event;
    } else {
      this.itemData = new BirdDamageModel();
    }
  }
}
