import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DynamicModule } from "app/main/@core/dynamic-component/dynamic.module";
import { AllUsersComponent } from "./all-users/all-users.component";
import { DirtycheckGuard } from "app/services/guards/dirtycheck.guard";
import { AllFishesComponent } from "./all-fishes/all-fishes.component";
import { AgeOfFishesComponent } from "./age-of-fishes/age-of-fishes.component";
import { AllOriginsComponent } from "./all-origins/all-origins.component";
import { AllWatersComponent } from "./all-waters/all-waters.component";
import { ManagementRegistersComponent } from "./management-registers/management-registers.component";
import { AllFishStockingReportsComponent } from "./all-fish-stocking-reports/all-fish-stocking-reports.component";
import { FishStockingReportDetailsComponent } from "./all-fish-stocking-reports/fish-stocking-report-details/fish-stocking-report-details.component";
import { TranslateModule } from "@ngx-translate/core";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { MainCoreCommonModule } from "app/main/@core/common/main-core-common.module";
import { AllFishCatchReportsComponent } from "./all-fish-catch-reports/all-fish-catch-reports.component";
import { FishCatchReportDetailsComponent } from "./all-fish-catch-reports/fish-catch-report-details/fish-catch-report-details.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { AllObservationSheetsComponent } from "./all-observation-sheets/all-observation-sheets.component";
import { ObservationSheetDetailsComponent } from "./all-observation-sheets/observation-sheet-details/observation-sheet-details.component";
import { AllBirdCountReportsComponent } from "./all-bird-count-reports/all-bird-count-reports.component";
import { BirdCountReportDetailsComponent } from "./all-bird-count-reports/bird-count-report-details/bird-count-report-details.component";
import { AllBirdDamageReportsComponent } from "./all-bird-damage-reports/all-bird-damage-reports.component";
import { BirdDamageReportDetailsComponent } from "./all-bird-damage-reports/bird-damage-report-details/bird-damage-report-details.component";
import { TemplateModule } from "../template/template.module";

const routes = [
  {
    path: "all-users",
    component: AllUsersComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-fishes",
    component: AllFishesComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-origins",
    component: AllOriginsComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-waters",
    component: AllWatersComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "age-of-fishes",
    component: AgeOfFishesComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "management-registers",
    component: ManagementRegistersComponent,
    canDeactivate: [DirtycheckGuard],
  },
  {
    path: "all-fish-stocking-reports",
    component: AllFishStockingReportsComponent,
  },
  {
    path: "fish-stocking-report-details",
    component: FishStockingReportDetailsComponent,
  },
  {
    path: "all-fish-catch-reports",
    component: AllFishCatchReportsComponent,
  },
  {
    path: "fish-catch-report-details",
    component: FishCatchReportDetailsComponent,
  },
  {
    path: "all-observation-sheets",
    component: AllObservationSheetsComponent,
  },
  {
    path: "observation-sheet-details",
    component: ObservationSheetDetailsComponent,
  },
  {
    path: "all-bird-count-reports",
    component: AllBirdCountReportsComponent,
  },
  {
    path: "bird-count-report-details",
    component: BirdCountReportDetailsComponent,
  },
  {
    path: "all-bird-damage-reports",
    component: AllBirdDamageReportsComponent,
  },
  {
    path: "bird-damage-report-details",
    component: BirdDamageReportDetailsComponent,
  },
];

@NgModule({
  declarations: [
    AllUsersComponent,
    AllFishesComponent,
    AgeOfFishesComponent,
    AllOriginsComponent,
    AllWatersComponent,
    ManagementRegistersComponent,
    AllFishStockingReportsComponent,
    AllFishCatchReportsComponent,
    FishStockingReportDetailsComponent,
    FishCatchReportDetailsComponent,
    AllObservationSheetsComponent,
    ObservationSheetDetailsComponent,
    AllBirdCountReportsComponent,
    BirdCountReportDetailsComponent,
    AllBirdDamageReportsComponent,
    BirdDamageReportDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DynamicModule,
    TranslateModule,
    NgbAlertModule,
    MainCoreCommonModule,
    NgSelectModule,
    TemplateModule,
  ],

  providers: [],
  exports: [RouterModule],
})
export class AdminModule {}
