import { IPhones } from "./IPhones";

export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  deleted?: boolean;
  phones?: IPhones;
}
