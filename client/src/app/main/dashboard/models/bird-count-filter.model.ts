import { FbzWaterModel } from "./filter-fbz-water.model";
import { ManagementRegisterModel } from "./management-register-model";

export class BirdCountFilterModel implements FbzWaterModel {
  managementRegister: ManagementRegisterModel;
  managementRegisterId: number;
  water: number;
}
