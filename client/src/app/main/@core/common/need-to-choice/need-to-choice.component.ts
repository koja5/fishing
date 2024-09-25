import { Component, Input } from "@angular/core";

@Component({
  selector: "app-need-to-choice",
  templateUrl: "./need-to-choice.component.html",
  styleUrls: ["./need-to-choice.component.scss"],
})
export class NeedToChoiceComponent {
  @Input() text?: string;
  @Input() image?: string;
}
