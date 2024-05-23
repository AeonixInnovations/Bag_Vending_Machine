import { ObjectId } from "mongoose";
import { Date } from "mongoose";

export interface StockInterface {
  device_id: string;
  date: Date;
  todaySellCount: number;
  refillCount: number;
  currentStock: number;
  refiller:ObjectId;
}
