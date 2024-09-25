import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../../../models/field-config";
import { DialogConfirmComponent } from "app/main/@core/common/dialog-confirm/dialog-confirm.component";
import { CallApiService } from "app/services/call-api.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";

@Component({
  selector: "app-password-box",
  templateUrl: "./password-box.component.html",
  styleUrls: ["./password-box.component.scss"],
})
export class PasswordBoxComponent {
  @ViewChild("dialogConfirm")
  dialogConfirm: DialogConfirmComponent;
  public config: FieldConfig;
  public group: FormGroup;
  public basicPwdShow = false;

  constructor(
    private _service: CallApiService,
    private _toastr: ToastrComponent
  ) {
    this.config = new FieldConfig();
    this.group = new FormGroup({});
  }

  ngOnInit(): void {}

  showDialogConfirm() {
    this.dialogConfirm.showQuestionModal();
  }

  generateNewPassword() {
    this._service
      .callPostMethod("/api/admin/generateNewPassword", this.group.value)
      .subscribe((data) => {
        if (data) {
          this._toastr.showSuccess();
        }
      });
  }
}
