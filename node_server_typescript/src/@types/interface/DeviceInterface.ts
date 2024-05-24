import { Types } from "mongoose";

export interface DeviceInterface {
  device_id: string;
  address: string;
  available_stocks: number;
  date: Date;
  machine_contact_number: string;
  marketID?: null | Types.ObjectId;
  // max_stocks:number,
  // last_update:Date,
}
