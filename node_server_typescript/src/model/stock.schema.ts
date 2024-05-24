import mongoose, { Schema } from "mongoose";
import { StockInterface } from "../@types/interface/Stock.interface";
import DeviceModel from "./deviceSchema";
import { ObjectId } from "mongodb";

export const stockSchema: Schema<StockInterface> = new mongoose.Schema(
  {
    device_id: {
      type: String,
      ref: DeviceModel,
      required: [true, "device_id cannot be blank"],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    todays_stock: {
      type: Number,
      default: 0,
    },
    today_sell_count: {
      type: Number,
      default: 0,
    },
    refillCount: {
      type: Number,
      default: 0,
    },
    refillDetails: {
      type: [Number], // Ensure refillDetails is an array of numbers
    },
    currentStock: {
      type: Number,
    },
    refiller: {
      type: [ObjectId],
    },
  },
  {
    timestamps: true,
  }
);

const StockModel = mongoose.model<StockInterface>("stockDetails", stockSchema);
export default StockModel;
