import { FishStockingReportEnum } from "../enums/fish-stocking-enum";

export class FishStockingReportModel {
  id?: number;
  id_owner?: number;
  fbz: string;
  year: number;
  status: FishStockingReportEnum;
  date_completed: Date;
}
