import { Component, ViewChild } from "@angular/core";
import { FieldConfig } from "../../../models/field-config";
import { FormGroup } from "@angular/forms";
import { HelpService } from "app/services/help.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import {
  loadCldr,
  L10n,
  setCulture,
  setCurrencyCode,
} from "@syncfusion/ej2-base";
import { DatePickerComponent } from "@syncfusion/ej2-angular-calendars";

setCulture("de-DE");

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"],
})
export class DatepickerComponent {
  @ViewChild("ejDate") ejDate?: DatePickerComponent;
  public config: FieldConfig;
  public group: FormGroup;
  public language: any;
  public minDate: Date;
  public maxDate: Date;
  // Private

  constructor() {
    this.config = new FieldConfig();
    this.group = new FormGroup({});
  }

  ngOnInit(): void {
    if (this.config.minDate) {
      this.minDate = new Date(this.config.minDate);
    }
    if (this.config.maxDate) {
      this.maxDate = new Date(this.config.maxDate);
    }

    if (this.config.dateRange) {
      if (this.config.dateRange === "CURRENT_YEAR") {
        this.minDate = new Date("1/1/" + new Date().getFullYear());
        this.maxDate = new Date("12/31/" + new Date().getFullYear());
      }
    }
  }

  ngModelChange(event) {
    this.checkIsValidDateRange();
  }

  checkIsValidDateRange() {
    // this.group.controls[this.config.field].setErrors({ incorrect: true });
    console.log(this.ejDate.value);
    if (
      this.ejDate.value >= new Date("1/1/" + new Date().getFullYear()) &&
      this.ejDate.value <= new Date("12/31/" + new Date().getFullYear())
    ) {
      this.group.controls[this.config.field].setErrors({ invalid: false });
      this.config.valueInvalid = false;
    } else {
      this.group.get(this.config.field).setErrors({ invalid: true });
      this.config.valueInvalid = true;
    }
    console.log(this.group.controls[this.config.field]);
  }
}
