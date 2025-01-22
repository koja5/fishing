import { FishStockingReportEnum } from "../enums/fish-stocking-enum";
import { ShareDataEnum } from "../enums/share-data-enum";

export class FishStockingReportModel {
  id?: number;
  id_owner?: number;
  fbz: string;
  year: number;
  status: FishStockingReportEnum;
  date_completed: Date;
  empty?: number = 0;
  share_data: ShareDataEnum
}
