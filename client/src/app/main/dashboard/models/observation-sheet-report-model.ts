import { ObservationSheetReportEnum } from "../enums/observation-sheet-enum";

export class ObservationSheetReportModel {
  id?: number;
  id_owner?: number;
  year: number;
  status: ObservationSheetReportEnum;
  date_completed: Date;
}
