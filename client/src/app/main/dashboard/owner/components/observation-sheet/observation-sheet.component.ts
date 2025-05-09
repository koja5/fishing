import { Component, ViewChild } from "@angular/core";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { ObservationSheetReportEnum } from "app/main/dashboard/enums/observation-sheet-enum";
import { ObservationSheetModel } from "app/main/dashboard/models/observation-sheet-model";
import { ObservationSheetReportModel } from "app/main/dashboard/models/observation-sheet-report-model";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";
import { MessageService } from "app/services/message.service";
import { StorageService } from "app/services/storage.service";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
  subscription: Subscription;
  private _unsubscribeAll: Subject<any>;
  public data: ObservationSheetModel[];
  public observationSheetReport: ObservationSheetReportModel;
  public observationSheetReportEnum = ObservationSheetReportEnum;
  public loading = false;
  public year: number;
  public isReportEditable = true;
  public user: UserModel;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _storageService: StorageService,
    private _messageService: MessageService
  ) {
    this._unsubscribeAll = new Subject();
    this.subscription = this._messageService.getYear().subscribe((year) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.initialize();
    this.getMyProfile();

    this._messageService
      .getRefreshObservationSheet()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getMyProfile() {
    this._service
      .callGetMethod("api/getMyProfile")
      .subscribe((user: UserModel[]) => {
        this.user = user[0];
      });
  }

  initialize() {
    this.year = this._storageService.getYear();
    this.isReportEditable = this._storageService.isReportForYearEditable();
    this.getAllObservationSheet();
    this.getObservationSheetReport();
  }

  getAllObservationSheet() {
    this.loading = true;
    this._service
      .callGetMethod("/api/owner/getAllObservationSheet", this.year)
      .subscribe((data: ObservationSheetModel[]) => {
        this.data = data;
        this.loading = false;
      });
  }

  getObservationSheetReport() {
    this._service
      .callGetMethod("/api/owner/getObservationSheetReport", this.year)
      .subscribe((data: ObservationSheetReportModel[]) => {
        if (data && data.length) {
          this.observationSheetReport = data[0];
        } else {
          this.observationSheetReport = new ObservationSheetReportModel();
          this.observationSheetReport.status =
            this.observationSheetReportEnum.draft;
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
      year: this.year,
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
      year: this.year,
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
    this.initialize();
  }
}
