import mongoose, { Schema } from "mongoose";
import { DeviceInterface } from "../@types/interface/DeviceInterface";


export const deviceSchema
: Schema<DeviceInterface> = new mongoose.Schema({
	device_id:{
        type:String,
        required:[true,"device_id can not be blank"],
    },
    address:{
        type: String,
        required: true
    },
    available_stocks:{
        type:Number,
        default:0
    },
    // max_stocks:{
    //     type:Number,
    //     default:0
    // },
    // last_update:{
    //     type:Date,
    //     default:Date.now()
    // },
    date:{
        type:String,
        required:true
    },
    machine_contact_number: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    }
},{timestamps: true}
);

const DeviceModel = mongoose.model<DeviceInterface>("deviceDetails", deviceSchema);

export default DeviceModel;