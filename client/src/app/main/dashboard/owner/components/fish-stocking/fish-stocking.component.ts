import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";
import { ManagementRegisterModel } from "../../../models/management-register-model";
import { FishStockingModel } from "../../../models/fish-stocking-model";
import { FishStockingReportModel } from "../../../models/fish-stocking-report-module";
import { FishStockingReportEnum } from "../../../enums/fish-stocking-enum";
import { StorageService } from "app/services/storage.service";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { ShareDataEnum } from "app/main/dashboard/enums/share-data-enum";
import { MessageService } from "app/services/message.service";
import { Subscription } from "rxjs";
import { FishStockingFilterModel } from "app/main/dashboard/models/fish-stocking-filter.model";

@Component({
  selector: "app-fish-stocking",
  templateUrl: "./fish-stocking.component.html",
  styleUrls: ["./fish-stocking.component.scss"],
})
export class FishStockingComponent implements OnInit {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogConfirmForShareData")
  dialogConfirmForShareData: DialogConfirmComponent;
  @ViewChild("dialogRequestForAdditionalChanges")
  dialogRequestForAdditionalChanges: DialogConfirmComponent;
  @ViewChild("dialogNoHaveEntry")
  dialogNoHaveEntry: DialogConfirmComponent;
  @ViewChild("dialogConfirmNoHaveEntryForShareData")
  dialogConfirmNoHaveEntryForShareData: DialogConfirmComponent;

  public path = "grids/owner";
  public file = "fish-stocking.json";
  public fileExportReport = "fish-stocking-report.json";
  private subscription: Subscription;
  public managementRegistersData: ManagementRegisterModel[];
  public data: FishStockingModel[];
  public fishStockingReport = new FishStockingReportModel();
  public selectedManagementRegistry: ManagementRegisterModel;
  public selectedManagementRegistryId: number;
  public filter = new FishStockingFilterModel();
  public loading = false;
  public fishStockingReportEnum = FishStockingReportEnum;
  public year: number;
  public isReportEditable = true;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _storageService: StorageService,
    private _messageService: MessageService
  ) {
    this.subscription = this._messageService.getYear().subscribe((year) => {
      this._storageService.deleteValueFromLocalStorage("fish-stocking-filter");
      this.ngOnInit();
    });
  }

  unsavedChanges(): boolean {
    if (this.grid) {
      return this.grid.unsavedChanges();
    }
  }

  ngOnInit() {
    this.year = this._storageService.getYear();
    this.isReportEditable = this._storageService.isReportForYearEditable();
    this._service
      .callGetMethod("/api/owner/getManagementRegistersData", this.year)
      .subscribe((data: ManagementRegisterModel[]) => {
        this.managementRegistersData = data;
        if (data.length) {
          // if (
          //   this._storageService.getLocalStorage("selectedManagementRegistry")
          // ) {
          //   this.filter.managementRegister =
          //     this._storageService.getLocalStorage(
          //       "selectedManagementRegistry"
          //     );
          // } else {
          //   this.filter.managementRegister = data[0];
          //   this._storageService.setLocalStorage(
          //     "selectedManagementRegistry",
          //     this.filter.managementRegister
          //   );
          // }

          if (
            this._storageService.getValueFromLocalStorage(
              "fish-stocking-filter"
            )
          ) {
            this.filter = this._storageService.getValueFromLocalStorage(
              "fish-stocking-filter"
            );
            this.filter.managementRegisterId =
              this.filter.managementRegister.id;
            this.initializeFishStocking();
          } else {
            this.filter = new FishStockingFilterModel();
          }
        } else {
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initializeFishStocking() {
    this.getFishStockingReport();
    this.getAllFishStocking();
  }

  getFishStockingReport() {
    this._service
      .callGetMethod(
        "/api/owner/getFishStockingReport?fbz=" +
          this.filter.managementRegister.fbz
      )
      .subscribe((data: FishStockingReportModel) => {
        if (data) {
          this.fishStockingReport = data[0];
        } else {
          this.fishStockingReport = new FishStockingReportModel();
        }
      });
  }

  getAllFishStocking() {
    this.loading = true;
    this._service
      .callGetMethod(
        "/api/owner/getAllFishStocking?fbz=" +
          this.filter.managementRegister.fbz +
          "&year=" +
          this.filter.managementRegister.year,
        ""
      )
      .subscribe((data: FishStockingModel[]) => {
        this.data = data;
        this.loading = false;
      });
  }

  checkCompletedStatusReport() {
    return (
      this.fishStockingReport &&
      this.fishStockingReport.status === FishStockingReportEnum.completed
    );
  }

  onChange(event: ManagementRegisterModel) {
    this.filter.managementRegister = event;
    if (this.filter.managementRegister) {
      this.filter.managementRegisterId = event.id;
      this._storageService.setLocalStorage(
        "selectedManagementRegistry",
        this.filter.managementRegister
      );
      this._storageService.setValueInLocalStorage(
        "fish-stocking-filter",
        this.filter
      );
      this.initializeFishStocking();
    } else {
      this._storageService.deleteValueFromLocalStorage("fish-stocking-filter");
      this._storageService.removeLocalStorage("selectedManagementRegistry");
      this.filter.managementRegisterId = null;
    }
  }

  submit(event: FishStockingModel) {
    event.fbz = this.filter.managementRegister.fbz;
    event.year = this.filter.managementRegister.year;
    this._service
      .callPostMethod("/api/owner/setFishStocking", event)
      .subscribe((data) => {
        if (data) {
          this.getAllFishStocking();
          this._toastr.showSuccess();
        }
      });
  }

  refreshGrid() {
    this.getAllFishStocking();
  }

  completeReports() {
    this.dialogConfirm.showQuestionModal();
  }

  requestForAdditionalChanges() {
    this.dialogRequestForAdditionalChanges.showQuestionModal();
  }

  showQuestionForConfirmReport() {
    this.dialogConfirmForShareData.showQuestionModal();
  }

  confirmCompleteReportAndShareData() {
    this.fishStockingReport = {
      fbz: this.filter.managementRegister.fbz,
      year: this.filter.managementRegister.year,
      status: FishStockingReportEnum.completed,
      date_completed: new Date(),
      empty: 0,
      share_data: ShareDataEnum.yes,
    };
    this.executeCompleteReportAction();
  }

  confirmCompleteReportAndNoShareData() {
    this.fishStockingReport = {
      fbz: this.filter.managementRegister.fbz,
      year: this.filter.managementRegister.year,
      status: FishStockingReportEnum.completed,
      date_completed: new Date(),
      empty: 0,
      share_data: ShareDataEnum.no,
    };
    this.executeCompleteReportAction();
  }

  executeCompleteReportAction() {
    this._service
      .callPostMethod(
        "/api/owner/completeFishStockingReport",
        this.fishStockingReport
      )
      .subscribe((data) => {
        if (data) {
          this.getAllFishStocking();
          this._toastr.showSuccess();
        }
      });
  }

  requestToAdminForAdditionalChanges() {
    this._service
      .callPostMethod(
        "/api/owner/requestToAdminForAdditionalFishStockingReportChanges",
        this.fishStockingReport
      )
      .subscribe((data) => {
        if (data) {
          this.getAllFishStocking();
          this._toastr.showSuccess();
        }
      });
  }

  noHaveFishStockingEntryDialog() {
    this.dialogNoHaveEntry.showQuestionModal();
  }

  showQuestionForNoHaveEntry() {
    this.dialogConfirmNoHaveEntryForShareData.showQuestionModal();
  }

  confirmNoHaveEntryAndShareData() {
    this.loading = true;
    this.fishStockingReport = {
      fbz: this.filter.managementRegister.fbz,
      year: this.filter.managementRegister.year,
      status: FishStockingReportEnum.completed,
      date_completed: new Date(),
      empty: 1,
      share_data: ShareDataEnum.yes,
    };
    this.executeNoEntryReportAction();
  }

  confirmNoHaveEntryAndNoShareData() {
    this.loading = true;
    this.fishStockingReport = {
      fbz: this.filter.managementRegister.fbz,
      year: this.filter.managementRegister.year,
      status: FishStockingReportEnum.completed,
      date_completed: new Date(),
      empty: 1,
      share_data: ShareDataEnum.no,
    };
    this.executeNoEntryReportAction();
  }

  executeNoEntryReportAction() {
    this._service
      .callPostMethod(
        "/api/owner/noHaveFishStockingEntry",
        this.fishStockingReport
      )
      .subscribe((data) => {
        if (data) {
          this.refreshGrid();
          this._toastr.showSuccess();
        }
      });
  }
}
