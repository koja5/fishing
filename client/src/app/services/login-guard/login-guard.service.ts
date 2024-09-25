import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HelpService } from "../help.service";
import { StorageService } from "../storage.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuardService {
  constructor(public _router: Router, public _storageService: StorageService) {}

  canActivate() {
    if (this._storageService.getToken()) {
      return true;
    } else {
      this._storageService.setLocalStorage(
        "previousLink",
        window.location.href.split(window.location.origin)[1]
      );
      this._router.navigate(["/auth/login"]);
      return false;
    }
  }
}
