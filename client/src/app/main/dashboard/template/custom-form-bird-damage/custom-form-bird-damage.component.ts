import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrComponent } from "app/main/@core/common/toastr/toastr.component";
import {
  BirdDamageModel,
  NestAndSleepingModule,
  RequestedForNextYear,
} from "app/main/dashboard/models/bird-damage.model";
import { CallApiService } from "app/services/call-api.service";
import { StorageService } from "app/services/storage.service";

@Component({
  selector: "app-custom-form-bird-damage",
  templateUrl: "./custom-form-bird-damage.component.html",
  styleUrls: ["./custom-form-bird-damage.component.scss"],
})
export class CustomFormBirdDamageComponent {
  @Input() data: BirdDamageModel;
  @Input() disableCRUD = false;
  @Input() disableInput = false;
  @Output() submit = new EventEmitter();

  public managementRegistersData: any;
  public sectionFourTitle: string;
  public year: number;
  objectKeys = Object.keys;

  constructor(
    private _service: CallApiService,
    private _translate: TranslateService,
    private _toastr: ToastrComponent,
    private _storageService: StorageService
  ) {}

  ngOnInit() {
    this.year = this._storageService.getYear();
    this.sectionFourTitle = this._translate
      .instant("birdDamage.sectionFourTitle")
      .replace("#year", this._translate.instant("birdDamage.nextYear"));

    this._service
      .callGetMethod("/api/owner/getManagementRegistersData", this.year)
      .subscribe((data) => {
        this.managementRegistersData = data;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data.nest_and_sleeping && !this.data.nest_and_sleeping.length) {
      this.data.nest_and_sleeping.push(new NestAndSleepingModule());
    }

    if (
      this.data.requested_for_next_year &&
      !this.data.requested_for_next_year.length
    ) {
      this.data.requested_for_next_year.push(new RequestedForNextYear());
    }
  }

  getData() {
    this._service
      .callGetMethod("/api/owner/getBirdDamage")
      .subscribe((data: BirdDamageModel) => {
        this.data = data;
        if (!this.data.nest_and_sleeping.length) {
          this.data.nest_and_sleeping.push(new NestAndSleepingModule());
        }

        if (!this.data.requested_for_next_year.length) {
          this.data.requested_for_next_year.push(new RequestedForNextYear());
        }
      });
  }

  initializeDefaultData() {}

  addNewRowForNestAndSleeping() {
    this.data.nest_and_sleeping.push(new NestAndSleepingModule());
  }

  removeRowFromNestAndSleeping(index) {
    this.data.nest_and_sleeping.splice(index, 1);

    if (index < this.data.nest_and_sleeping.length) {
      for (let i = index; i < this.data.nest_and_sleeping.length; i++) {
        this.data.nest_and_sleeping[i]["name_of_water_" + i] =
          this.data.nest_and_sleeping[i]["name_of_water_" + (i + 1)];
        this.data.nest_and_sleeping[i]["horste_" + i] =
          this.data.nest_and_sleeping[i]["horste_" + (i + 1)];
        this.data.nest_and_sleeping[i]["kormoran_" + i] =
          this.data.nest_and_sleeping[i]["kormoran_" + (i + 1)];
      }
    }
  }

  addNewRowForRequestedForNextYear() {
    this.data.requested_for_next_year.push(new RequestedForNextYear());
  }

  removeRowFromRequestedForNextYear(index) {
    this.data.requested_for_next_year.splice(index, 1);

    //prepacked properties - after delete property need to have index - 1
    if (index < this.data.requested_for_next_year.length) {
      for (let i = index; i < this.data.requested_for_next_year.length; i++) {
        this.data.requested_for_next_year[i]["fbz_" + i] =
          this.data.requested_for_next_year[i]["fbz_" + (i + 1)];
        this.data.requested_for_next_year[i]["wild_region_" + i] =
          this.data.requested_for_next_year[i]["wild_region_" + (i + 1)];
        this.data.requested_for_next_year[i]["heron_for_request_" + i] =
          this.data.requested_for_next_year[i]["heron_for_request_" + (i + 1)];
        this.data.requested_for_next_year[i]["kormoran_for_request_" + i] =
          this.data.requested_for_next_year[i][
            "kormoran_for_request_" + (i + 1)
          ];
      }
    }
  }

  save() {
    this._service
      .callPostMethod("api/owner/setBirdDamage", this.data)
      .subscribe((data) => {
        if (data) {
          setTimeout(() => {
            this.submit.emit();
            this._toastr.showSuccess();
          }, 20);
        }
      });
  }

  calculateSumPriceForKomorantage() {
    if (this.data.komorantage_number && this.data.komorantage_damage_number) {
      this.data.komorantage_sum_price =
        this.data.komorantage_damage_number *
        this._translate.instant("birdDamagePrice.pricePerKg");
      return this.data.komorantage_sum_price.toFixed(2);
    }
    return "";
  }

  calculatePriceForKomorantageDamage() {
    if (this.data.komorantage_number) {
      this.data.komorantage_damage_number =
        this.data.komorantage_number *
        this._translate.instant("birdDamagePrice.komorantageForKg");
      return this.data.komorantage_damage_number.toFixed(2);
    }
    return "";
  }

  calculateSumPriceForGoosander() {
    if (this.data.goosander_number && this.data.goosander_damage_number) {
      this.data.goosander_sum_price =
        this.data.goosander_damage_number *
        this._translate.instant("birdDamagePrice.pricePerKgGoosander");
      return this.data.goosander_sum_price.toFixed(2);
    }
    return "";
  }

  calculatePriceForGoosanderDamage() {
    if (this.data.goosander_number) {
      this.data.goosander_damage_number =
        this.data.goosander_number *
        this._translate.instant("birdDamagePrice.goosanderForKg");
      return this.data.goosander_damage_number.toFixed(2);
    }
    return "";
  }

  calculatePriceForHeronDemage() {
    if (this.data.heron_number) {
      this.data.heron_damage_number =
        this.data.heron_number *
        this._translate.instant("birdDamagePrice.heronForKg");
      return this.data.heron_damage_number.toFixed(2);
    }
    return "";
  }

  calculateSumPriceForHeron() {
    if (this.data.heron_number && this.data.heron_damage_number) {
      this.data.heron_sum_price =
        this.data.heron_damage_number *
        this._translate.instant("birdDamagePrice.pricePerKg");
      return this.data.heron_sum_price.toFixed(2);
    }
    return "";
  }

  calculateDamageOfSeedlings() {
    if (this.data.number_of_seedlings) {
      this.data.damage_of_seedlings =
        this.data.number_of_seedlings *
        this._translate.instant("birdDamagePrice.pricePerItem");
      return this.data.damage_of_seedlings.toFixed(2);
    }
    return "";
  }

  calculateDamageAmountOfInjured() {
    if (this.data.amount_of_injured_kg) {
      this.data.damage_amount_of_injured =
        this.data.amount_of_injured_kg *
        this._translate.instant("birdDamagePrice.pricePerKg");
      return this.data.damage_amount_of_injured.toFixed(2);
    }
    return "";
  }
}
