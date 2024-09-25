import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ObservationSheetModel } from "app/main/dashboard/models/observation-sheet-model";
import { UserModel } from "app/models/user";
import { CallApiService } from "app/services/call-api.service";

@Component({
  selector: "app-observation-sheet-details",
  templateUrl: "./observation-sheet-details.component.html",
  styleUrls: ["./observation-sheet-details.component.scss"],
})
export class ObservationSheetDetailsComponent {
  public path = "grids/admin";
  public file = "observation-sheet-details.json";
  public loader = false;

  public userProfile = new UserModel();
  public data: ObservationSheetModel;

  constructor(
    private _service: CallApiService,
    public _activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUserProfile();
    this.getObservationSheetDetails();
  }

  getUserProfile() {
    this._service
      .callGetMethod(
        "api/admin/getUserProfile",
        this._activatedRouter.snapshot.queryParams.id_owner
      )
      .subscribe((data: UserModel) => {
        this.userProfile = data;
      });
  }

  getObservationSheetDetails() {
    this.loader = true;
    this._service
      .callGetMethod(
        "api/admin/getObservationSheetDetails?fbz=" +
          this._activatedRouter.snapshot.queryParams.fbz +
          "&year=" +
          this._activatedRouter.snapshot.queryParams.year
      )
      .subscribe((data: ObservationSheetModel) => {
        this.data = data;
        this.loader = false;
      });
  }

}
