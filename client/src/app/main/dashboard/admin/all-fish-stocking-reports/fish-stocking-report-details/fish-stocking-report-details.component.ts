import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { FishStockingReportEnum } from "app/main/dashboard/enums/fish-stocking-enum";
import { FishStockingReportModel } from "app/main/dashboard/models/fish-stocking-report-module";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-fish-stocking-report-details",
  templateUrl: "./fish-stocking-report-details.component.html",
  styleUrls: ["./fish-stocking-report-details.component.scss"],
})
export class FishStockingReportDetailsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirmBackReport")
  dialogConfirmBackReport: DialogConfirmComponent;
  @ViewChild("dialogConfirmReminderOwner")
  dialogConfirmReminderOwner: DialogConfirmComponent;

  public path = "grids/admin";
  public file = "fish-stocking-report-details.json";
  public data: any;
  public fishStockingReport = new FishStockingReportModel();
  public FISH_STOCKING_REPORT_ENUM = FishStockingReportEnum;
  public userProfile = new UserModel();
  public ownerName: string;
  public loader = false;

  constructor(
    private _service: CallApiService,
    private _activatedRouter: ActivatedRoute,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.getFishStockingReportDetails();
    this.getFishStockingReportStatus();
  }

  getFishStockingReportDetails() {
    this._service
      .callGetMethod(
        "/api/admin/getFishStockingReportDetails?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  getFishStockingReportStatus() {
    this._service
      .callGetMethod(
        "/api/admin/getFishStockingReport?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data: FishStockingReportModel) => {
        this.fishStockingReport = data;
        this.getUserProfile();
      });
  }

  getUserProfile() {
    this._service
      .callGetMethod(
        "/api/admin/getUserProfile",
        this.fishStockingReport.id_owner
      )
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

  reminderOwnerToCompleteFishStockingReport() {
    this.loader = true;
    this._service
      .callPostMethod("/api/mail/reminderOwnerToCompleteFishStockingReport", {
        fishStockingReport: this.fishStockingReport,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.fishStockingReport.status = FishStockingReportEnum.draft;
        }
      });
  }

  backFishStockingReportToOwner() {
    this.loader = true;
    this._service
      .callPostMethod("/api/admin/backFishStockingReportToOwner", {
        fishStockingReport: this.fishStockingReport,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.fishStockingReport.status = FishStockingReportEnum.draft;
          this._toastr.showSuccess();
        }
      });
  }
}
