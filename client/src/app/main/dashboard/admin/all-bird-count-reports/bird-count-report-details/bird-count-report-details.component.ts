import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { ReportStatusEnum } from "app/main/dashboard/enums/report-status-enum";
import { BirdCountFilterModel } from "app/main/dashboard/models/bird-count-filter.model";
import { BirdCountReportModel } from "app/main/dashboard/models/bird-count-report.model";
import { BirdCountModel } from "app/main/dashboard/models/bird-count.model";
import { BirdCountEmpty } from "app/main/dashboard/owner/components/bird-count/bird-count-empty";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-bird-count-report-details",
  templateUrl: "./bird-count-report-details.component.html",
  styleUrls: ["./bird-count-report-details.component.scss"],
})
export class BirdCountReportDetailsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirmBackReport")
  dialogConfirmBackReport: DialogConfirmComponent;
  @ViewChild("dialogConfirmReminderOwner")
  dialogConfirmReminderOwner: DialogConfirmComponent;

  public path = "grids/admin";
  public file = "all-bird-count-report-details.json";
  public data: BirdCountModel[] = [];
  public report = new BirdCountReportModel();
  public REPORT_STATUS_ENUM = ReportStatusEnum;
  public userProfile = new UserModel();
  public ownerName: string;
  public loader = false;

  public allWaters: any;
  public filter = new BirdCountFilterModel();

  constructor(
    private _service: CallApiService,
    private _activatedRouter: ActivatedRoute,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.getReportStatus();
    this.getWatersForSelectedManagementRegister();
  }

  getWatersForSelectedManagementRegister() {
    this._service
      .callGetMethod(
        "api/owner/getAllWaters?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz
      )
      .subscribe((data: any) => {
        this.allWaters = data;
        if (data.length === 1) {
          this.filter.water = data[0].id_water;
        }
      });
  }

  getDetailsForSelectedWater(id_water: number) {
    this.initializeDefaultData();
    this.loader = true;
    this._service
      .callGetMethod(
        "/api/admin/getBirdCountDetailsForSelectedWater?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year +
          "&id_water=" +
          id_water
      )
      .subscribe((data: BirdCountModel[]) => {
        this.prepackedData(data);
        this.loader = false;
      });
  }

  getReportStatus() {
    this._service
      .callGetMethod(
        "/api/admin/getBirdCountReport?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data: BirdCountReportModel) => {
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
      .callPostMethod("/api/mail/reminderOwnerToCompleteBirdCountReport", {
        report: this.report,
        userProfile: this.userProfile,
      })
      .subscribe((data) => {
        if (data) {
          this.loader = false;
          this.report.status = this.REPORT_STATUS_ENUM.draft;
        }
      });
  }

  backReportToOwner() {
    this.loader = true;
    this._service
      .callPostMethod("/api/admin/backBirdCountReportToOwner", {
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

  onChangeWater(event: any) {
    if (event) {
      this.getDetailsForSelectedWater(event.id);
    } else {
      this.emptyGrid();
    }
  }

  initializeDefaultData() {
    this.data = new BirdCountEmpty().data;
    const year = this._activatedRouter.snapshot.queryParams.year;
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].date = this.data[i].date.replace(
        "#currentYear",
        year.toString()
      );
    }
  }

  prepackedData(data: BirdCountModel[]) {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (this.data[i].date === data[j].date) {
          this.data[i] = data[j];
          break;
        }
      }
    }
  }

  emptyGrid() {
    this.loader = true;
    setTimeout(() => {
      this.data = [];
      this.loader = false;
    }, 10);
  }
}
