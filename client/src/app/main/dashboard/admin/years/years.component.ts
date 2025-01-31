import { Component, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-years",
  templateUrl: "./years.component.html",
  styleUrls: ["./years.component.scss"],
})
export class YearsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "years.json";
  public data: any;
  public loader = false;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent,
    private _translate: TranslateService
  ) {}

  ngOnInit() {
    this.getYears();
  }

  getYears() {
    this.loader = true;
    this._service.callGetMethod("api/getYears").subscribe((data) => {
      this.data = data;
      this.loader = false;
    });
  }

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }

  submit(event: any) {
    if (!event.rows) {
      this._service
        .callPostMethod("api/admin/setYear", event)
        .subscribe((data) => {
          this.getYears();
          if (event.editable) {
            this._toastr.showInfoCustom(
              this._translate.instant(
                "actionMessage.turnOnEditableAllManagementRegisters"
              )
            );
            this._service
              .callPostMethod(
                "api/admin/setManagementRegisterEditableToOn",
                event
              )
              .subscribe((data) => {});
          } else {
            this._toastr.showWarningCustom(
              this._translate.instant(
                "actionMessage.turnOffEditableAllManagementRegisters"
              )
            );
            this._service
              .callPostMethod(
                "api/admin/setManagementRegisterEditableToOff",
                event
              )
              .subscribe((data) => {});
          }
        });
    }
  }
}
