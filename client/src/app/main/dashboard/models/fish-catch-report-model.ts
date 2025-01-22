import { FishCatchReportEnum } from "../enums/fish-catch-enum";
import { ShareDataEnum } from "../enums/share-data-enum";

export class FishCatchReportModel {
  id?: number;
  id_owner?: number;
  fbz: string;
  year: number;
  status: FishCatchReportEnum;
  date_completed: Date;
  empty?: number = 0;
  share_data: ShareDataEnum;
}
