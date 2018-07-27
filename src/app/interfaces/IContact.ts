import { IPhones } from "./IPhones";

export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  deleted?: boolean;
  phones?: IPhones;
}
