import { Component, TemplateRef, ViewChild } from "@angular/core";
import { BirdCountFilterModel } from "app/main/dashboard/models/bird-count-filter.model";
import { BirdCountModel } from "app/main/dashboard/models/bird-count.model";
import { ManagementRegisterModel } from "app/main/dashboard/models/management-register-model";
import { CallApiService } from "app/services/call-api.service";
import { StorageService } from "app/services/storage.service";
import { BirdCountEmpty } from "./bird-count-empty";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { BirdCountReportModel } from "app/main/dashboard/models/bird-count-report.model";
import { ReportStatusEnum } from "app/main/dashboard/enums/report-status-enum";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HelpService } from "app/services/help.service";
import { WaterCustomModel } from "app/main/dashboard/models/water-custom-model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-bird-count",
  templateUrl: "./bird-count.component.html",
  styleUrls: ["./bird-count.component.scss"],
})
export class BirdCountComponent {
  public path = "grids/owner";
  public file = "bird-count.json";

  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogNoHaveEntry")
  dialogNoHaveEntry: DialogConfirmComponent;
  @ViewChild("dialogRequestForAdditionalChanges")
  dialogRequestForAdditionalChanges: DialogConfirmComponent;
  @ViewChild("modalNewEntrie") modal: TemplateRef<any>;
  public modalDialog: any;

  public managementRegistersData: ManagementRegisterModel[];
  public filter = new BirdCountFilterModel();
  public allWaters: any;
  public data: BirdCountModel[] = [];
  public report: BirdCountReportModel;
  public reportStatusEnum = ReportStatusEnum;
  public loading = false;
  public waterCustom = new WaterCustomModel();

  constructor(
    private _service: CallApiService,
    private _storageService: StorageService,
    private _toastr: ToastrComponent,
    private _modalService: NgbModal,
    private _helpService: HelpService,
    public _translate: TranslateService
  ) {}

  ngOnInit() {
    this.getManagementRegistersData();

    if (this._storageService.getValueFromLocalStorage("bird-count-filter")) {
      this.filter =
        this._storageService.getValueFromLocalStorage("bird-count-filter");
      if (this.filter.water) {
        this.getBirdCountForSelectedWater();
      } else {
        this.data = [];
      }
    } else {
      this.filter = new BirdCountFilterModel();
    }
  }

  getManagementRegistersData() {
    this._service
      .callGetMethod("/api/owner/getManagementRegistersData", "")
      .subscribe((data: ManagementRegisterModel[]) => {
        this.managementRegistersData = data;
        if (data.length) {
          if (this.filter.managementRegister) {
            this.getWatersForSelectedManagementRegister(
              this.filter.managementRegister.fbz
            );
          } else {
            this.data = [];
          }
        }
      });
  }

  getWatersForSelectedManagementRegister(fbz: string) {
    this._service
      .callGetMethod("api/owner/getAllWaters?fbz=" + fbz)
      .subscribe((data: any) => {
        this.allWaters = data;
        if (data.length === 1) {
          this.filter.water = data[0].id;
          this.getBirdCountForSelectedWater();
        }
        this.getBirdCountReport();
      });
  }

  getBirdCountForSelectedWater() {
    this.initializeDefaultData();
    this.loading = true;
    this._service
      .callGetMethod(
        "api/owner/getBirdCountForSelectedWater?fbz=" +
          this.filter.managementRegister.fbz +
          "&id_water=" +
          this.filter.water
      )
      .subscribe((data: BirdCountModel[]) => {
        this.prepackedData(data);
        this.loading = false;
      });
  }

  getBirdCountReport() {
    this._service
      .callGetMethod(
        "/api/owner/getBirdCountReport?fbz=" +
          this.filter.managementRegister.fbz
      )
      .subscribe((data: BirdCountModel) => {
        if (data) {
          this.report = data[0];
        } else {
          this.report = new BirdCountReportModel();
        }
      });
  }

  onChangeManagementRegister(event: ManagementRegisterModel) {
    // empty grid
    this.loading = true;
    setTimeout(() => {
      this.data = [];
      this.loading = false;
    }, 1);
    //
    this.filter.managementRegister = event;
    this.filter.water = null;
    this._storageService.setValueInLocalStorage(
      "bird-count-filter",
      this.filter
    );
    if (this.filter.managementRegister) {
      this.filter.managementRegisterId = event.id;
      this.getWatersForSelectedManagementRegister(event.fbz);
      this._storageService.setValueInLocalStorage(
        "bird-count-filter",
        this.filter
      );
    } else {
      this._storageService.deleteValueFromLocalStorage("bird-count-filter");
      this.allWaters = null;
      this.filter = new BirdCountFilterModel();
    }
  }

  onChangeWater() {
    this.getBirdCountForSelectedWater();
    this._storageService.setValueInLocalStorage(
      "bird-count-filter",
      this.filter
    );
  }

  initializeDefaultData() {
    this.data = new BirdCountEmpty().data;
    const year = this.filter.managementRegister.year;
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].date = this.data[i].date.replace(
        "#currentYear",
        year.toString()
      );
    }
  }

  prepackedData(data: BirdCountModel[]) {
    for (let j = 0; j < data.length; j++) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].date === data[j].date) {
          this.data[i] = data[j];
          break;
        }
      }
    }
  }

  submit(event: BirdCountModel) {
    event.fbz = this.filter.managementRegister.fbz;
    event.year = this.filter.managementRegister.year;
    event.id_water = this.filter.water;

    this._service
      .callPostMethod("/api/owner/setBirdCount", event)
      .subscribe((data) => {
        if (data) {
          this.getBirdCountForSelectedWater();
          this._toastr.showSuccess();
        }
      });
  }

  refreshGrid() {
    this.getBirdCountForSelectedWater();
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
    };
    this._service
      .callPostMethod("/api/owner/completeBirdCountReport", this.report)
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
    };
    this._service
      .callPostMethod("/api/owner/noHaveBirdCountEntry", this.report)
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
        "/api/owner/requestToAdminForAdditionalBirdCountReportChanges",
        this.report
      )
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }

  openModalNewEntrie() {
    setTimeout(() => {
      this.modalDialog = this._modalService.open(this.modal, {
        centered: true,
        windowClass: "modal modal-danger",
      });
    }, 20);
  }

  submitNewEntriesEmitter(event) {
    if (
      this._helpService.checkUndefinedProperty(event) &&
      event.type != "submit"
    ) {
      this.waterCustom = {
        type_of_water: event.type_of_water,
        name: event.name,
        fbz: this.filter.managementRegister.fbz,
      };

      this._service
        .callPostMethod("/api/owner/createNewWaterNameEntry", this.waterCustom)
        .subscribe((entryId: number) => {
          this.getWatersForSelectedManagementRegister(
            this.filter.managementRegister.fbz
          );
          this.filter.water = entryId;
          this.loading = true;
          setTimeout(() => {
            this.initializeDefaultData();
            this.loading = false;
          }, 10);
          this.modalDialog.close();
        });
    }
  }
}
