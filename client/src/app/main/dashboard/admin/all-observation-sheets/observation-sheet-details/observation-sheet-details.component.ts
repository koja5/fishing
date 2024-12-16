import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { ObservationSheetReportEnum } from "app/main/dashboard/enums/observation-sheet-enum";
import { ObservationSheetModel } from "app/main/dashboard/models/observation-sheet-model";
import { ObservationSheetReportModel } from "app/main/dashboard/models/observation-sheet-report-model";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-observation-sheet-details",
  templateUrl: "./observation-sheet-details.component.html",
  styleUrls: ["./observation-sheet-details.component.scss"],
})
export class ObservationSheetDetailsComponent {
  @ViewChild("dialogConfirmBackReport")
  dialogConfirmBackReport: DialogConfirmComponent;
  @ViewChild("dialogConfirmReminderOwner")
  dialogConfirmReminderOwner: DialogConfirmComponent;
  public path = "grids/admin";
  public file = "observation-sheet-details.json";
  public loader = false;

  public observationSheetReport = new ObservationSheetReportModel();
  public OBSERVATION_SHEET_REPORT_ENUM = ObservationSheetReportEnum;

  public userProfile = new UserModel();
  public data: ObservationSheetModel;

  constructor(
    private _service: CallApiService,
    public _activatedRouter: ActivatedRoute,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.getObservationSheetDetails();
    this.getObservationSheetReportStatus();
  }

  getUserProfile() {
    this._service
      .callGetMethod(
        "api/admin/getUserProfile",
        this._activatedRouter.snapshot.queryParams.id_owner
      )
      .subscribe((data: UserModel) => {
        this.userProfile = data;
      });
  }

  getObservationSheetDetails() {
    this.loader = true;
    this._service
      .callGetMethod(
        "api/admin/getObservationSheetDetails?year=" +
          this._activatedRouter.snapshot.queryParams.year +
          "&id_owner=" +
          this._activatedRouter.snapshot.queryParams.id_owner
      )
      .subscribe((data: ObservationSheetModel) => {
        this.data = data;
        this.loader = false;
      });
  }

  getObservationSheetReportStatus() {
    this._service
      .callGetMethod(
        "/api/admin/getObservationSheetReport?year=" +
          this._activatedRouter.snapshot.queryParams.year +
          "&id_owner=" +
          this._activatedRouter.snapshot.queryParams.id_owner
      )
      .subscribe((data: ObservationSheetReportModel) => {
        this.observationSheetReport = data;
        this.getUserProfile();
      });
  }

  dialogConfirmBackReportShow() {
    this.dialogConfirmBackReport.showQuestionModal();
  }

  dialogConfirmReminderOwnerShow() {
    this.dialogConfirmReminderOwner.showQuestionModal();
  }

  reminderOwnerToCompleteObservationSheetReport() {
    this.loader = true;
    this._service
      .callPostMethod(
        "/api/mail/reminderOwnerToCompleteObservationSheetReport",
        {
          report: this.observationSheetReport,
          userProfile: this.userProfile,
        }
      )
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.observationSheetReport.status =
            this.OBSERVATION_SHEET_REPORT_ENUM.draft;
        }
      });
  }

  backObservationSheetReportToOwner() {
    this.loader = true;
    this._service
      .callPostMethod("/api/admin/backObservationSheetReportToOwner", {
        report: this.observationSheetReport,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.observationSheetReport.status =
            this.OBSERVATION_SHEET_REPORT_ENUM.draft;
          this._toastr.showSuccess();
        }
      });
  }
}
