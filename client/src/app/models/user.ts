import { UserTypes } from "app/main/enums/user-types";
import { Role } from "../auth/models/role";

export class UserModel {
  id_owner: number;
  firstname: string;
  lastname: string;
  street: string;
  location: string;
  bidrtday: Date;
  email: string;
  username: string;
  password: string;
  type: UserTypes;
  active: boolean;
}
