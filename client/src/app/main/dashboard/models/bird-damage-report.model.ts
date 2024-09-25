import { ReportStatusEnum } from "../enums/report-status-enum";

export class BirdDamageReportModel {
  id?: number;
  id_owner?: number;
  fbz: string;
  year: number;
  status: ReportStatusEnum;
  date_completed: Date;
}
