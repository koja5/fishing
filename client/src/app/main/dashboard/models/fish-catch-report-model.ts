import { FishCatchReportEnum } from "../enums/fish-catch-enum";

export class FishCatchReportModel {
  id?: number;
  id_owner?: number;
  fbz: string;
  year: number;
  status: FishCatchReportEnum;
  date_completed: Date;
}
