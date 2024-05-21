import mongoose, {Schema} from "mongoose";
import { StockInterface } from "../@types/interface/Stock.interface";
import DeviceModel from "./deviceSchema";

export const stockSchema: Schema<StockInterface> = new mongoose.Schema({
    device_id: {
        type: String,
        ref: DeviceModel,
        required:[true, "device_id can not be blank"],
    },
    date: {
        type: Date,
        required: true,
    },
    todaySellCount: {
        type: Number,
        default: 0,
    },
    refillCount: {
        type: Number,
        default: 0
    },
    currentStock: {
        type: Number
    }
},
{
    timestamps: true
}
)

const StockModel = mongoose.model<StockInterface>("stockDetails",stockSchema );
export default StockModel;
