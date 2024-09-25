import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";
import { ManagementRegisterModel } from "../../../models/management-register-model";
import { FishStockingReportEnum } from "../../../enums/fish-stocking-enum";
import { StorageService } from "app/services/storage.service";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { FishCatchModel } from "app/main/dashboard/models/fish-catch.model";
import { TranslateService } from "@ngx-translate/core";
import { FishCatchFilterModel } from "app/main/dashboard/models/fish-catch-filter.model";
import { FishCatchReportModel } from "app/main/dashboard/models/fish-catch-report-model";
import { FishCatchReportEnum } from "app/main/dashboard/enums/fish-catch-enum";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HelpService } from "app/services/help.service";
import { WaterCustomModel } from "app/main/dashboard/models/water-custom-model";

@Component({
  selector: "app-fish-catch",
  templateUrl: "./fish-catch.component.html",
  styleUrls: ["./fish-catch.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FishCatchComponent {
  @ViewChild("grid") grid: DynamicGridComponent;
  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  @ViewChild("dialogRequestForAdditionalChanges")
  dialogRequestForAdditionalChanges: DialogConfirmComponent;
  @ViewChild("dialogNoHaveEntry")
  dialogNoHaveEntry: DialogConfirmComponent;
  @ViewChild("modalNewEntrie") modal: TemplateRef<any>;
  public modalDialog: any;

  public path = "grids/owner";
  public file = "fish-catch.json";
  public managementRegistersData: ManagementRegisterModel[];
  public data: FishCatchModel[];
  public allData: FishCatchModel[];
  public fishCatchReport = new FishCatchReportModel();
  public selectedManagementRegistry: ManagementRegisterModel;
  public selectedManagementRegistryId: number;
  public selectNameOfWaterId: number;
  public fishCatchFilter = new FishCatchFilterModel();
  public loading = true;
  public fishCatchReportEnum = FishCatchReportEnum;
  public allWaters: any;
  public waterCustom = new WaterCustomModel();
  public itemData: FishCatchModel;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _storageService: StorageService,
    private _translate: TranslateService,
    private _modalService: NgbModal,
    private _helpService: HelpService
  ) {}

  unsavedChanges(): boolean {
    if (this.grid) {
      return this.grid.unsavedChanges();
    }
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    if (this._storageService.getValueFromLocalStorage("fish-catch-filter")) {
      this.fishCatchFilter =
        this._storageService.getValueFromLocalStorage("fish-catch-filter");
      this.getFishCatchDetailsForManagementRegister();
    } else {
      this.fishCatchFilter = new FishCatchFilterModel();
    }

    this._service
      .callGetMethod("/api/owner/getManagementRegistersData", "")
      .subscribe((data: ManagementRegisterModel[]) => {
        this.managementRegistersData = data;
        if (data.length) {
          if (this.fishCatchFilter.managementRegister) {
            this.getWatersForSelectedManagementRegister(
              this.fishCatchFilter.managementRegister.fbz
            );
          } else {
            this.data = [];
          }
        } else {
          this.loading = false;
        }
      });
  }

  getFishStockingReport() {
    this._service
      .callGetMethod(
        "/api/owner/getFishCatchReport?fbz=" +
          this.fishCatchFilter.managementRegister.fbz
      )
      .subscribe((data: FishCatchReportModel) => {
        if (data) {
          this.fishCatchReport = data[0];
        } else {
          this.fishCatchReport = new FishCatchReportModel();
        }
      });
  }

  getFishCatchDetailsForManagementRegister() {
    if (this.fishCatchFilter && this.fishCatchFilter.managementRegister) {
      this._service
        .callGetMethod(
          "/api/owner/getFishCatchDetailsForManagementRegister?fbz=" +
            this.fishCatchFilter.managementRegister.fbz
        )
        .subscribe((data: FishCatchModel[]) => {
          this.allData = data;
        });
    }
  }

  checkCompletedStatusReport() {
    return (
      this.fishCatchReport &&
      this.fishCatchReport.status === FishCatchReportEnum.completed
    );
  }

  onChangeManagementRegister(event: ManagementRegisterModel) {
    this.fishCatchFilter.managementRegister = event;
    this.fishCatchFilter.water = null;
    this._storageService.setValueInLocalStorage(
      "fish-catch-filter",
      this.fishCatchFilter
    );
    if (this.fishCatchFilter.managementRegister) {
      this.fishCatchFilter.managementRegisterId = event.id;
      this.getWatersForSelectedManagementRegister(event.fbz);
      this._storageService.setLocalStorage(
        "selectedManagementRegistry",
        this.fishCatchFilter.managementRegister
      );
    } else {
      this._storageService.deleteValueFromLocalStorage("fish-catch-filter");
      this.fishCatchFilter = new FishCatchFilterModel();
      this.allWaters = null;
      this.refreshGrid();
    }
  }

  getWatersForSelectedManagementRegister(fbz: string) {
    this._service
      .callGetMethod("api/owner/getAllWaters?fbz=" + fbz)
      .subscribe((data: any) => {
        this.allWaters = data;
        if (data.length === 1) {
          this.fishCatchFilter.water = data[0].id;
        }
        this.getFishStockingReport();
        this.getFishCatchDetailsForSelectedWater();
      });
  }

  onChangeWater() {
    this.getFishCatchDetailsForSelectedWater();
    this._storageService.setValueInLocalStorage(
      "fish-catch-filter",
      this.fishCatchFilter
    );
  }

  getFishCatchDetailsForSelectedWater() {
    this.loading = true;
    if (this.fishCatchFilter.managementRegister || this.fishCatchFilter.water) {
      this._service
        .callGetMethod(
          "api/owner/getFishCatchDetailsForSelectedWater?fbz=" +
            this.fishCatchFilter.managementRegister.fbz +
            "&id_water=" +
            this.fishCatchFilter.water
        )
        .subscribe((data: FishCatchModel[]) => {
          this.data = data;
          this.loading = false;
        });
    } else {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 100);
    }
  }

  submit(event: FishCatchModel) {
    if (event.edible_fish_quantity <= event.quantity) {
      event.stocked_fish_quantity = event.quantity - event.edible_fish_quantity;
    } else if (event.edible_fish_quantity > event.quantity) {
      this._toastr.showWarningCustom(
        this._translate.instant("actionMessage.successExecuteActionTextDefault")
      );
      return;
    }

    event.fbz = this.fishCatchFilter.managementRegister.fbz;
    event.year = this.fishCatchFilter.managementRegister.year;
    event.id_water = this.fishCatchFilter.water;

    this.loading = true;
    this._service
      .callPostMethod("/api/owner/setFishCatch", event)
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
          setTimeout(() => {
            this.refreshGrid();
          }, 20);
        }
      });
  }

  refreshGrid() {
    this.getFishCatchDetailsForSelectedWater();
    this.getFishCatchDetailsForManagementRegister();
  }

  completeReportsDialog() {
    this.dialogConfirm.showQuestionModal();
  }

  requestForAdditionalChanges() {
    this.dialogRequestForAdditionalChanges.showQuestionModal();
  }

  confirmCompleteReport() {
    this.loading = true;
    this.fishCatchReport = {
      fbz: this.fishCatchFilter.managementRegister.fbz,
      year: this.fishCatchFilter.managementRegister.year,
      status: FishCatchReportEnum.completed,
      date_completed: new Date(),
    };
    this._service
      .callPostMethod(
        "/api/owner/completeFishCatchReport",
        this.fishCatchReport
      )
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
          this.refreshGrid();
        }
      });
  }

  requestToAdminForAdditionalChanges() {
    this._service
      .callPostMethod(
        "/api/owner/requestToAdminForAdditionalFishCatchReportChanges",
        this.fishCatchReport
      )
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }

  noHaveFishCatchEntryDialog() {
    this.dialogNoHaveEntry.showQuestionModal();
  }

  confirmNoHaveFishCatchEntry() {
    this.loading = true;
    this.fishCatchReport = {
      fbz: this.fishCatchFilter.managementRegister.fbz,
      year: this.fishCatchFilter.managementRegister.year,
      status: FishCatchReportEnum.completed,
      date_completed: new Date(),
    };
    this._service
      .callPostMethod("/api/owner/noHaveFishCatchEntry", this.fishCatchReport)
      .subscribe((data) => {
        if (data) {
          this.refreshGrid();
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
        fbz: this.fishCatchFilter.managementRegister.fbz,
      };

      this._service
        .callPostMethod("/api/owner/createNewWaterNameEntry", this.waterCustom)
        .subscribe((entryId: number) => {
          this.getWatersForSelectedManagementRegister(
            this.fishCatchFilter.managementRegister.fbz
          );
          this.fishCatchFilter.water = entryId;
        });
    }
  }

  emitValueForCustomForm(event: FishCatchModel) {
    if (event) {
      this.itemData = event;
    } else {
      this.itemData = new FishCatchModel();
    }
    this.itemData.fbz = this.fishCatchFilter.managementRegister.fbz;
    this.itemData.year = this.fishCatchFilter.managementRegister.year;
    this.itemData.id_water = this.fishCatchFilter.water;
  }

  handleSubmit(event: any) {
    this.grid.closeEditForm();
    setTimeout(() => {
      this.refreshGrid();
    }, 20);
  }
}
