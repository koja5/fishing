import { Component, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-explanation-mark",
  templateUrl: "./explanation-mark.component.html",
  styleUrls: ["./explanation-mark.component.scss"],
})
export class ExplanationMarkComponent {
  @Input() explanation!: any;
  @Input() mainExplanation: any;
  @Input() fontSize: string = "";

  constructor(public _translate: TranslateService) {}

  generateText() {
    const mainExplanation = this._translate.instant(this.mainExplanation);
    if (mainExplanation.text) {
      return mainExplanation.text;
    } else {
      return false;
    }
  }

  generateLink() {
    const mainExplanation = this._translate.instant(this.mainExplanation);
    if (mainExplanation.link) {
      return mainExplanation.link;
    } else return false;
  }
}
