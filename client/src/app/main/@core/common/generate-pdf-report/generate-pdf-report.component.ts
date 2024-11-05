import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoreConfigService } from "@core/services/config.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";
import { ConfigurationService } from "app/services/configuration.service";
import { StorageService } from "app/services/storage.service";
import { ExportAsConfig, ExportAsService } from "ngx-export-as";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-generate-pdf-report",
  templateUrl: "./generate-pdf-report.component.html",
  styleUrls: ["./generate-pdf-report.component.scss"],
})
export class GeneratePdfReportComponent {
  @Input() path: string;
  @Input() file: string;
  @Input() data: any;
  @Input() config: any;
  @Input() splitHeader = false;
  @ViewChild("modal") modal: TemplateRef<any>;
  public modalDialog: any;
  private exportAsConfigToPdf: ExportAsConfig = {
    type: "pdf",
    elementIdOrContent: "export-pdf",
    options: {
      margin: 5,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", orientation: "l", compress: true },
    },
  };
  private _unsubscribeAll: Subject<any>;

  public rows: any;
  public user: UserModel;
  public loader = false;
  public todayDate = new Date();

  constructor(
    private exportAsService: ExportAsService,
    private _configurationService: ConfigurationService,
    private _service: CallApiService,
    private _activateRouter: ActivatedRoute,
    private _storageService: StorageService,
    private _modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.initialize();
    this.getMe();
  }

  getMe() {
    this._service
      .callGetMethod("api/getMyProfile")
      .subscribe((data: UserModel[]) => {
        this.user = data[0];
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  initialize() {
    if (this.path && this.file) {
      this._configurationService
        .getConfiguration(this.path, this.file)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data) => {
          this.config = data;
          if (this.config.request) {
            this._service
              .callApi(this.config, this._activateRouter)
              .subscribe((data) => {
                this.rows = data;
              });
          }
        });
    } else if (this.data) {
      this.rows = this.data;
    }
  }

  exportToPdf() {
    this.loader = true;
    this.modalDialog = this._modalService.open(this.modal, {
      centered: true,
      modalDialogClass: "export-pdf-modal",
    });

    setTimeout(() => {
      this.exportAsService
        .save(this.exportAsConfigToPdf, this.generateReportName())
        .subscribe((data) => {
          this.loader = false;
          this.modalDialog.close();
        });
    }, 1);
  }

  generateReportName() {
    return this.config.name + " - " + new Date().getFullYear();
  }

  convertStringToArray(value) {
    console.log(JSON.parse(value));
    return JSON.parse(value);
  }
}
