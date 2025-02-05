import { Component, TemplateRef, ViewChild } from "@angular/core";
import { BirdCountFilterModel } from "app/main/dashboard/models/bird-count-filter.model";
import { BirdCountModel } from "app/main/dashboard/models/bird-count.model";
import { ManagementRegisterModel } from "app/main/dashboard/models/management-register-model";
import { CallApiService } from "app/services/call-api.service";
import { StorageService } from "app/services/storage.service";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { BirdCountReportModel } from "app/main/dashboard/models/bird-count-report.model";
import { ReportStatusEnum } from "app/main/dashboard/enums/report-status-enum";
import { MessageService } from "app/services/message.service";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { BirdDamageModel } from "app/main/dashboard/models/bird-damage.model";
import { BirdDamageFilterModel } from "app/main/dashboard/models/bird-damage-filter.model";
import { BirdDamageReportModel } from "app/main/dashboard/models/bird-damage-report.model";
import { Subscription } from "rxjs";
import { UserModel } from "app/models/user";

@Component({
  selector: "app-bird-damage",
  templateUrl: "./bird-damage.component.html",
  styleUrls: ["./bird-damage.component.scss"],
})
export class BirdDamageComponent {
  public path = "grids/owner";
  public file = "bird-damage.json";
  public fileExportReport = "bird-damage-report.json";
  subscription: Subscription;

  @ViewChild("grid") grid: DynamicGridComponent;

  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogNoHaveEntry")
  dialogNoHaveEntry: DialogConfirmComponent;
  @ViewChild("dialogRequestForAdditionalChanges")
  dialogRequestForAdditionalChanges: DialogConfirmComponent;
  @ViewChild("modalNewEntrie") modal: TemplateRef<any>;
  public modalDialog: any;

  public managementRegistersData: ManagementRegisterModel[];
  public filter = new BirdDamageFilterModel();
  public allWaters: any;
  public data: BirdDamageModel[] = [];
  public itemData: BirdDamageModel;
  public report: BirdDamageReportModel;
  public reportStatusEnum = ReportStatusEnum;
  public loading = false;
  public year: number;
  public isReportEditable = true;
  public user: UserModel;

  constructor(
    private _service: CallApiService,
    private _storageService: StorageService,
    private _toastr: ToastrComponent,
    private _messageService: MessageService
  ) {
    this.subscription = this._messageService.getYear().subscribe((year) => {
      this._storageService.deleteValueFromLocalStorage("bird-damage-filter");
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.year = this._storageService.getYear();
    this.isReportEditable = this._storageService.isReportForYearEditable();
    this.getManagementRegistersData();
    this.getMyProfile();

    if (this._storageService.getValueFromLocalStorage("bird-damage-filter")) {
      this.filter =
        this._storageService.getValueFromLocalStorage("bird-damage-filter");
    } else {
      this.filter = new BirdDamageFilterModel();
    }

    this.getDataForGrid();
    this.getReport();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMyProfile() {
    this._service
      .callGetMethod("api/getMyProfile")
      .subscribe((user: UserModel[]) => {
        this.user = user[0];
      });
  }

  getManagementRegistersData() {
    this._service
      .callGetMethod("/api/owner/getManagementRegistersData", this.year)
      .subscribe((data: ManagementRegisterModel[]) => {
        this.managementRegistersData = data;
      });
  }

  getDataForGrid() {
    this.loading = true;
    this._service
      .callGetMethod(
        "api/owner/getBirdDamage?fbz=" +
          (this.filter &&
          this.filter.managementRegister &&
          this.filter.managementRegister.fbz
            ? this.filter.managementRegister.fbz
            : null + " ")
      )
      .subscribe((data: BirdDamageModel[]) => {
        this.data = data;
        this.loading = false;
      });
  }

  getReport() {
    this._service
      .callGetMethod(
        "/api/owner/getBirdDamageReport?fbz=" +
          (this.filter &&
          this.filter.managementRegister &&
          this.filter.managementRegister.fbz
            ? this.filter.managementRegister.fbz
            : null)
      )
      .subscribe((data: BirdDamageReportModel) => {
        if (data) {
          this.report = data[0];
        } else {
          this.report = new BirdDamageReportModel();
        }
      });
  }

  onChangeManagementRegister(event: ManagementRegisterModel) {
    this.filter.managementRegister = event;
    this._storageService.setValueInLocalStorage(
      "bird-damage-filter",
      this.filter
    );
    if (this.filter.managementRegister) {
      this._storageService.setValueInLocalStorage(
        "bird-damage-filter",
        this.filter
      );
    } else {
      this._storageService.deleteValueFromLocalStorage("bird-damage-filter");
      this.filter = new BirdDamageFilterModel();
    }

    this.getDataForGrid();
    this.getReport();
  }

  emitValueForCustomForm(event: BirdDamageModel) {
    if (event) {
      this.itemData = event;
    } else {
      this.itemData = new BirdDamageModel();
    }
    this.itemData.fbz = this.filter.managementRegister.fbz;
    this.itemData.year = this.filter.managementRegister.year;
  }

  refreshGrid() {
    this.getDataForGrid();
  }

  completeReportsDialog() {
    this.dialogConfirm.showQuestionModal();
  }

  confirmCompleteReport() {
    this.loading = true;
    this.report = {
      fbz: this.filter.managementRegister.fbz,
      year: this.filter.managementRegister.year,
      status: ReportStatusEnum.completed,
      date_completed: new Date(),
      empty: 0,
    };
    this._service
      .callPostMethod("/api/owner/completeBirdDamageReport", this.report)
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
          this.refreshGrid();
        }
      });
  }

  noHaveEntryDialog() {
    this.dialogNoHaveEntry.showQuestionModal();
  }

  confirmNoHaveEntry() {
    this.loading = true;
    this.report = {
      fbz: this.filter.managementRegister.fbz,
      year: this.filter.managementRegister.year,
      status: this.reportStatusEnum.completed,
      date_completed: new Date(),
      empty: 1,
    };
    this._service
      .callPostMethod("/api/owner/noHaveBirdDamageEntry", this.report)
      .subscribe((data) => {
        if (data) {
          this.refreshGrid();
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
        "/api/owner/requestToAdminForAdditionalBirdDamageReportChanges",
        this.report
      )
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }

  handleSubmit(event) {
    this.grid.closeEditForm();
    this.getDataForGrid();
  }
}
