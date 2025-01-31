import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";
import { MessageService } from "app/services/message.service";
import { StorageService } from "app/services/storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-all-fish-catch-reports",
  templateUrl: "./all-fish-catch-reports.component.html",
  styleUrls: ["./all-fish-catch-reports.component.scss"],
})
export class AllFishCatchReportsComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "all-fish-catch-reports.json";
  private subscription: Subscription;
  public data: any;
  public loader = false;

  constructor(
    private _service: CallApiService,
    private _storageService: StorageService,
    private _messageService: MessageService
  ) {
    this.subscription = this._messageService.getYear().subscribe((year) => {
      this.getData(year);
    });
  }

  ngOnInit() {
    const year = this._storageService.getYear();
    this.getData(year);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getData(year: number) {
    this.loader = true;
    this._service
      .callGetMethod("/api/admin/getAllFishCatchReports", year)
      .subscribe((data) => {
        this.data = data;
        this.loader = false;
      });
  }
}
