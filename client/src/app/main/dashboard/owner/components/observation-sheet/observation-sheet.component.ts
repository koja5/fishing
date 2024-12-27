import { Component, ViewChild } from "@angular/core";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { ObservationSheetReportEnum } from "app/main/dashboard/enums/observation-sheet-enum";
import { ObservationSheetModel } from "app/main/dashboard/models/observation-sheet-model";
import { ObservationSheetReportModel } from "app/main/dashboard/models/observation-sheet-report-model";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-observation-sheet",
  templateUrl: "./observation-sheet.component.html",
  styleUrls: ["./observation-sheet.component.scss"],
})
export class ObservationSheetComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogRequestForAdditionalChanges")
  dialogRequestForAdditionalChanges: DialogConfirmComponent;
  @ViewChild("dialogNoHaveEntry")
  dialogNoHaveEntry: DialogConfirmComponent;

  public path = "grids/owner";
  public file = "observation-sheet.json";
  public fileExportReport = "observation-sheet-report.json";
  public data: ObservationSheetModel[];
  public observationSheetReport: ObservationSheetReportModel;
  public observationSheetReportEnum = ObservationSheetReportEnum;
  public loading = false;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    // this.getAllObservationSheet();
    this.getObservationSheetReport();
  }

  getAllObservationSheet() {
    this.loading = true;
    this._service
      .callGetMethod("/api/owner/getAllObservationSheet")
      .subscribe((data: ObservationSheetModel[]) => {
        this.data = data;
        this.loading = false;
      });
  }

  getObservationSheetReport() {
    this._service
      .callGetMethod("/api/owner/getObservationSheetReport")
      .subscribe((data: ObservationSheetReportModel) => {
        if (data) {
          this.observationSheetReport = data[0];
        } else {
          this.observationSheetReport = new ObservationSheetReportModel();
        }
      });
  }

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }

  completeReports() {
    this.dialogConfirm.showQuestionModal();
  }

  confirmCompleteReport() {
    this.observationSheetReport = {
      year: new Date().getFullYear(),
      status: ObservationSheetReportEnum.completed,
      date_completed: new Date(),
      empty: 0,
    };
    this._service
      .callPostMethod(
        "/api/owner/completeObservationSheetReport",
        this.observationSheetReport
      )
      .subscribe((data) => {
        if (data) {
          this.getAllObservationSheet();
          this._toastr.showSuccess();
        }
      });
  }

  requestForAdditionalChanges() {
    this.dialogRequestForAdditionalChanges.showQuestionModal();
  }

  requestToAdminForAdditionalChanges() {
    this._service
      .callPostMethod(
        "/api/owner/requestToAdminForAdditionalObservationSheetReportChanges",
        this.observationSheetReport
      )
      .subscribe((data) => {
        if (data) {
          this.getAllObservationSheet();
          this._toastr.showSuccess();
        }
      });
  }

  noHaveFishStockingEntryDialog() {
    this.dialogNoHaveEntry.showQuestionModal();
  }

  confirmNoHaveFishStockingEntry() {
    this.loading = true;
    this.observationSheetReport = {
      year: new Date().getFullYear(),
      status: ObservationSheetReportEnum.completed,
      date_completed: new Date(),
      empty: 1,
    };
    this._service
      .callPostMethod(
        "/api/owner/noHaveObservationSheetEntry",
        this.observationSheetReport
      )
      .subscribe((data) => {
        if (data) {
          this.getAllObservationSheet();
          this._toastr.showSuccess();
        }
      });
  }

  refreshParentComponent(data) {
    this.data = data;
    this.getObservationSheetReport();
  }
}
