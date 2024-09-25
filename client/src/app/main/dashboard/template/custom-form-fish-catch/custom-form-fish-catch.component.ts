import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { BirdDamageModel } from "../../models/bird-damage.model";
import { CallApiService } from "app/services/call-api.service";
import { TranslateService } from "@ngx-translate/core";
import { FishCatchModel } from "../../models/fish-catch.model";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HelpService } from "app/services/help.service";

@Component({
  selector: "app-custom-form-fish-catch",
  templateUrl: "./custom-form-fish-catch.component.html",
  styleUrls: ["./custom-form-fish-catch.component.scss"],
})
export class CustomFormFishCatchComponent {
  @Input() config: any;
  @Input() data: FishCatchModel;
  @Input() fishCatchFilter: any;
  @Output() submit = new EventEmitter();
  @ViewChild("modalNewEntrie") modal: TemplateRef<any>;

  public allFishes: any;
  public modalDialog: any;

  constructor(
    private _service: CallApiService,
    private _translate: TranslateService,
    private _toastr: ToastrComponent,
    private _modalService: NgbModal,
    private _helpService: HelpService
  ) {}

  ngOnInit() {
    this._service
      .callGetMethod(
        "/api/owner/getAllFishes?fbz=" +
          this.fishCatchFilter.managementRegister.fbz +
          "&year=" +
          this.fishCatchFilter.managementRegister.year
      )
      .subscribe((data) => {
        this.allFishes = data;
      });
  }

  calculateStockedFishQuantity() {
    if (this.data.edible_fish_quantity && this.data.quantity) {
      this.data.quantity = Number(this.data.quantity);
      this.data.edible_fish_quantity = Number(this.data.edible_fish_quantity);
      if (this.data.quantity >= this.data.edible_fish_quantity) {
        this.data.stocked_fish_quantity =
          this.data.quantity - this.data.edible_fish_quantity;
        return this.data.stocked_fish_quantity;
      } else {
        return "";
      }
    }
    return "";
  }

  checkValues() {
    return Number(this.data.quantity) < Number(this.data.edible_fish_quantity)
      ? true
      : false;
  }

  save() {
    this._service
      .callPostMethod("api/owner/setFishCatch", this.data)
      .subscribe((data) => {
        if (data) {
          setTimeout(() => {
            this.submit.emit();
            this._toastr.showSuccess();
          }, 20);
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
      let body = {
        name: event.name,
        fbz: this.fishCatchFilter.managementRegister.fbz,
        year: this.fishCatchFilter.managementRegister.year,
      };

      this._service
        .callPostMethod("/api/owner/createNewFishNameEntry", body)
        .subscribe((entryId: string) => {
          this._service
            .callGetMethod(
              "/api/owner/getAllFishes?fbz=" +
                this.fishCatchFilter.managementRegister.fbz +
                "&year=" +
                this.fishCatchFilter.managementRegister.year
            )
            .subscribe(
              (data) => {
                this.allFishes = data;
                this.data.fish = entryId;
                this.modalDialog.close();
              },
              (error) => {
                this.modalDialog.close();
              }
            );
        });
    }
  }
}
