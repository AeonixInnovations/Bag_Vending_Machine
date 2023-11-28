import mongoose, { Schema } from "mongoose";
import { DeviceInterface } from "../@types/interface/DeviceInterface";


export const counterCameraSchema: Schema<DeviceInterface> = new mongoose.Schema({
	device_id:{
        type:String,
        required:[true,"device_id can not be blank"],
    },
    available_stocks:{
        type:Number,
        default:0
    },
    max_stocks:{
        type:Number,
        default:0
    },
    last_update:{
        type:Date,
        default:Date.now()
    },
    date:{
        type:String,
        required:true
    }
}
);

const DeviceModel = mongoose.model<DeviceInterface>("deviceDetails", counterCameraSchema);

export default DeviceModel;