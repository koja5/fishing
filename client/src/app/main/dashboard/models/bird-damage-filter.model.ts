import { FbzWaterModel } from "./filter-fbz-water.model";
import { ManagementRegisterModel } from "./management-register-model";

export class BirdDamageFilterModel implements FbzWaterModel {
  managementRegister: ManagementRegisterModel;
  managementRegisterId: number;
  water: number;
}
