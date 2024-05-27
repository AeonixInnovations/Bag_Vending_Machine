import { ObjectId } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";
import DeviceModel from "./deviceSchema";
import { MarketInterface } from "../@types/interface/Market.interface";

const marketSchema: Schema<MarketInterface> = new mongoose.Schema({
  marketName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  lat: {
    type: String,
    trim: true,
  },
  long: {
    type: String,
    trim: true,
  },
  // deviceId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "DeviceModel"
  // }
});

const MarketModel = mongoose.model<MarketInterface>("market", marketSchema);
export default MarketModel;
