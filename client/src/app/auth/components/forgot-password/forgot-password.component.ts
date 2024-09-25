import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { CoreConfigService } from "@core/services/config.service";
import { CallApiService } from "app/services/call-api.service";
import { StorageService } from "app/services/storage.service";
import { ResponseModel } from "app/models/response-model";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {
  // Public
  public emailVar;
  public coreConfig: any;
  public forgotPasswordForm: UntypedFormGroup;
  public submitted = false;
  public response = new ResponseModel();

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   *
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _service: CallApiService,
    private _storageService: StorageService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.sendResetLink();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });

    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  sendResetLink() {
    this.response = new ResponseModel();
    this._service
      .callPostMethod("/api/auth/forgotPassword", {
        data: this.forgotPasswordForm.value,
        lang: this._storageService.getSelectedLanguage(),
      })
      .subscribe((data) => {
        if (data) {
          this.response.sendLinkForResetOnMail = true;
        } else {
          this.response.mailNotExists = true;
        }
      });
  }
}
