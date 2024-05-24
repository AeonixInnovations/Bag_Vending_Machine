import { ObjectId } from "mongodb";
import mongoose, { Schema, Types } from "mongoose";
import DeviceModel from "./deviceSchema";
import { MarketInterface } from "../@types/interface/Market.interface";

const marketSchema: Schema<MarketInterface> = new mongoose.Schema({
  marketName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  // deviceId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "DeviceModel"
  // }
});

const MarketModel = mongoose.model<MarketInterface>("market", marketSchema);
export default MarketModel;
