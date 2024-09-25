import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreCommonModule } from "@core/common.module";

import { LoginComponent } from "./components/login/login.component";
import { TranslateModule } from "@ngx-translate/core";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SelectLanguageComponent } from './components/common/select-language/select-language.component';

// routing
const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: { animation: "auth" },
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "reset-password/:email",
    component: ResetPasswordComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SelectLanguageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    TranslateModule,
  ],
})
export class AuthModule {}
