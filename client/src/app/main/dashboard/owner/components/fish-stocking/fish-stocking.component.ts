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

@Component({
  selector: "app-fish-stocking",
  templateUrl: "./fish-stocking.component.html",
  styleUrls: ["./fish-stocking.component.scss"],
})
export class FishStockingComponent implements OnInit {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogRequestForAdditionalChanges")
  dialogRequestForAdditionalChanges: DialogConfirmComponent;
  @ViewChild("dialogNoHaveEntry")
  dialogNoHaveEntry: DialogConfirmComponent;

  public path = "grids/owner";
  public file = "fish-stocking.json";
  public managementRegistersData: ManagementRegisterModel[];
  public data: FishStockingModel[];
  public fishStockingReport = new FishStockingReportModel();
  public selectedManagementRegistry: ManagementRegisterModel;
  public selectedManagementRegistryId: number;
  public loading = true;
  public fishStockingReportEnum = FishStockingReportEnum;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _storageService: StorageService
  ) {}

  unsavedChanges(): boolean {
    if (this.grid) {
      return this.grid.unsavedChanges();
    }
  }

  ngOnInit() {
    this._service
      .callGetMethod("/api/owner/getManagementRegistersData", "")
      .subscribe((data: ManagementRegisterModel[]) => {
        this.managementRegistersData = data;
        if (data.length) {
          if (
            this._storageService.getLocalStorage("selectedManagementRegistry")
          ) {
            this.selectedManagementRegistry =
              this._storageService.getLocalStorage(
                "selectedManagementRegistry"
              );
          } else {
            this.selectedManagementRegistry = data[0];
          }
          this.selectedManagementRegistryId =
            this.selectedManagementRegistry.id;
          this.initializeFishStocking();
        } else {
          this.loading = false;
        }
      });
  }

  initializeFishStocking() {
    this.getFishStockingReport();
    this.getAllFishStocking();
  }

  getFishStockingReport() {
    this._service
      .callGetMethod(
        "/api/owner/getFishStockingReport?fbz=" +
          this.selectedManagementRegistry.fbz
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
          this.selectedManagementRegistry.fbz +
          "&year=" +
          this.selectedManagementRegistry.year,
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
    this.selectedManagementRegistry = event;
    if (this.selectedManagementRegistry) {
      this.selectedManagementRegistryId = event.id;
      this._storageService.setLocalStorage(
        "selectedManagementRegistry",
        this.selectedManagementRegistry
      );
      this.initializeFishStocking();
    } else {
      this._storageService.removeLocalStorage("selectedManagementRegistry");
      this.selectedManagementRegistryId = null;
    }
  }

  submit(event: FishStockingModel) {
    event.fbz = this.selectedManagementRegistry.fbz;
    event.year = this.selectedManagementRegistry.year;
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

  confirmCompleteReport() {
    this.fishStockingReport = {
      fbz: this.selectedManagementRegistry.fbz,
      year: this.selectedManagementRegistry.year,
      status: FishStockingReportEnum.completed,
      date_completed: new Date(),
    };
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

  confirmNoHaveFishStockingEntry() {
    this.loading = true;
    this.fishStockingReport = {
      fbz: this.selectedManagementRegistry.fbz,
      year: this.selectedManagementRegistry.year,
      status: FishStockingReportEnum.completed,
      date_completed: new Date(),
    };
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
