import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomFormBirdDamageComponent } from "./custom-form-bird-damage/custom-form-bird-damage.component";
import { TranslateModule } from "@ngx-translate/core";
import { DynamicFormsModule } from "../../@core/dynamic-component/dynamic-forms/dynamic-forms-module/dynamic-forms.module";
import { CustomFormFishCatchComponent } from './custom-form-fish-catch/custom-form-fish-catch.component';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [CustomFormBirdDamageComponent, CustomFormFishCatchComponent],
  imports: [CommonModule, FormsModule, TranslateModule, DynamicFormsModule, NgSelectModule],
  providers: [],
  exports: [CustomFormBirdDamageComponent, CustomFormFishCatchComponent],
})
export class TemplateModule {}
