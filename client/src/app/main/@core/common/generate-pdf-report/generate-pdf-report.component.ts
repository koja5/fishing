import { Component, Input, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoreConfigService } from "@core/services/config.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";
import { ConfigurationService } from "app/services/configuration.service";
import { HelpService } from "app/services/help.service";
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
  @Input() groupBy: string;
  @Input() year: number;
  @Input() hideExportButton: boolean = true;
  @Input() reportTemplate: TemplateRef<any>;
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
    private _modalService: NgbModal,
    private _helpService: HelpService
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
        });
    }
  }

  groupReportByField(data: any[], groupBy: string) {
    let packData = [];
    let group = [];
    let i = 0;
    let copyData = this._helpService.copyObject(data);

    if (copyData.length > 1) {
      while (i < copyData.length - 1) {
        let j = i + 1;
        group.push(copyData[i]);
        let ind = true;
        while (ind) {
          if (
            j < copyData.length &&
            copyData[i][groupBy] === copyData[j][groupBy]
          ) {
            group.push(copyData[j]);
            j++;
          } else {
            ind = false;
          }
        }
        i = j;
        packData.push(group);
        group = [];
        if (i === copyData.length - 1) {
          group.push(copyData[i]);
          packData.push(group);
          break;
        }
      }
    } else if (copyData.length === 1) {
      group.push(copyData[i]);
      packData.push(group);
    }

    // while (copyData.length > 0) {
    //   group.push(copyData[i]);
    //   if (i + 1 < copyData.length) {
    //     let j = this._helpService.copyObject(i + 1);
    //     while (copyData.length > 1) {
    //       if (copyData[i][groupBy] === copyData[j][groupBy]) {
    //         group.push(copyData[j]);
    //         copyData.splice(j, 1);
    //       } else {
    //         packData.push(group);
    //         copyData.splice(i, 1);
    //         group = [];
    //         i = 0;
    //         break;
    //       }
    //     }
    //   } else {
    //     packData.push(group);
    //     copyData = [];
    //   }
    // }

    return packData;
  }

  exportToPdf() {
    if (this.data) {
      if (this.groupBy) {
        this.data = this.data.sort(
          (a: any, b: any) => a[this.groupBy] - b[this.groupBy]
        );
        if (this.data.length > 1)
          this.rows = this.groupReportByField(this.data, this.groupBy);
      } else {
        this.rows = this.data;
      }
      this.saveToPdf();
    } else if (this.config.request && !this.data) {
      if (this.config.request.type === "GET") {
        this._service
          .callGetMethod(this.config.request.api, this.year)
          .subscribe((data: any[]) => {
            if (this.groupBy) {
              this.rows = this.groupReportByField(data, this.groupBy);
            } else {
              this.rows = data;
            }
            this.saveToPdf();
          });
      } else {
        this._service
          .callApi(this.config, this._activateRouter)
          .subscribe((data: any[]) => {
            if (this.groupBy) {
              this.rows = this.groupReportByField(data, this.groupBy);
            } else {
              this.rows = data;
            }
            this.saveToPdf();
          });
      }
    }
  }

  saveToPdf() {
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
    return this.config && this.config.name
      ? this.config.name + " - " + this._storageService.getYear()
      : "Report";
  }

  convertStringToArray(value) {
    if (value.indexOf("{") != -1 || value.indexOf("[") !== -1) {
      return JSON.parse(value);
    } else {
      return value;
    }
  }

  getReportName() {
    if (this.config) {
      const date = new Date();
      return this.config.name + " - " + this.year;
    } else {
      return "Report";
    }
  }
}
