import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../storage.service";
import { UserTypes } from "app/main/enums/user-types";

@Injectable({
  providedIn: "root",
})
export class LoggedGuard {
  constructor(
    private _router: Router,
    private _storageService: StorageService
  ) {}

  canActivate() {
    if (!this._storageService.getToken()) {
      return true;
    } else {
      const token = this._storageService.getDecodeToken();
      const previousLink = this._storageService.getLocalStorage("previousLink");
      if (previousLink) {
        this._router.navigate([previousLink]);
        this._storageService.removeLocalStorage("previousLink");
      } else if (token.type === UserTypes.admin) {
        this._router.navigate(["/dashboard/admin/all-users"]);
      } else if (token.type === UserTypes.owner) {
        this._router.navigate(["/dashboard/owner/fish-stocking"]);
      }
      return false;
    }
  }
}
