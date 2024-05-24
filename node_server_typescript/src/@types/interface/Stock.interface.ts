import { ObjectId } from "mongoose";
import { Date } from "mongoose";

export interface StockInterface {
  device_id: string;
  date: Date;
  todays_stock: number;
  refillCount: number;
  refillDetails?: number[];
  currentStock: number;
  refiller?: ObjectId[];
  today_sell_count: number;
}
