import { Component, ViewChild } from "@angular/core";
import { DynamicGridComponent } from "app/main/@core/dynamic-component/dynamic-grid/dynamic-grid.component";
import { CallApiService } from "app/services/call-api.service";
import { MessageService } from "app/services/message.service";
import { StorageService } from "app/services/storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-management-registers",
  templateUrl: "./management-registers.component.html",
  styleUrls: ["./management-registers.component.scss"],
})
export class ManagementRegistersComponent {
  @ViewChild("grid") grid: DynamicGridComponent;

  public path = "grids/admin";
  public file = "management-registers.json";
  private subscription: Subscription;
  public loader = false;
  public data: any;

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
      .callGetMethod("/api/admin/getManagementRegisters", year)
      .subscribe((data) => {
        this.data = data;
        this.loader = false;
      });
  }

  unsavedChanges(): boolean {
    return this.grid.unsavedChanges();
  }
}
