import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dialog-confirm",
  templateUrl: "./dialog-confirm.component.html",
  styleUrls: ["./dialog-confirm.component.scss"],
})
export class DialogConfirmComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() confirmButton = true;
  @Input() cancelButton = true;
  @Input() confirmButtonText: string;
  @Input() cancelButtonText: string;
  @Input() hideCloseButton = false;
  @Input() disableOutsideClose = false;
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @ViewChild("modal") modal: TemplateRef<any>;
  public modalDialog: any;

  constructor(private _modalService: NgbModal) {}

  ngOnInit() {
    // setTimeout(() => {
    //   this.showQuestionModal();
    // }, 20);
  }

  showQuestionModal() {
    setTimeout(() => {
      this.modalDialog = this._modalService.open(this.modal, {
        centered: true,
        windowClass: "modal modal-danger",
        backdrop: this.disableOutsideClose ? "static" : true,
        keyboard: this.disableOutsideClose ? false : true,
      });
    }, 20);
  }

  confirmAction() {
    this.confirm.emit();
    this.modalDialog.close();
  }

  cancelAction() {
    this.cancel.emit();
    this.modalDialog.close();
  }
}
