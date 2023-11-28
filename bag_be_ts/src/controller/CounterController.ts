import { Request, Response } from "express";
import DeviceModel from "../model/CounterSchema";
import { DeviceInterface } from "../@types/interface/DeviceInterface";


export const registerNewDevice = async (req: Request, res: Response) => {
    const { device_id, stock } = req.body;
    if (!device_id || !stock) {
        res.status(422).json({
            message: "fields are empty"
        })
    }
    else {
        try {
            const isExist = await DeviceModel.findOne({device_id:device_id});
            if(isExist){
                return res.status(409).json({
                    message:"Device Already exist",
                })
            }
            const payload: DeviceInterface = {
                available_stocks: stock,
                date: new Date().toDateString(),
                device_id: device_id,
                last_update: new Date(),
                max_stocks: stock,
            }
            const response = await new DeviceModel(payload).save();
            console.log(response);
            if (response) {
                return res.status(200).json({
                    message: "device register successfully",
                    result: response
                })
            }
        }
        catch (error) {
            return res.status(400).json({
                message: "error in server",
                error
            })
        }
    }
}

export const getAllDeviceList = async (req: Request, res: Response) => {
    try {
        const response = await DeviceModel.find({});
        if (response) {
            return res.status(200).json({
                message: "device list get successfully",
                data: response
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        })
    }
}

export const getDeviceMaxStockById = async (req: Request, res: Response) => {
    try {
        const {device_id}=req.params;
        const response = await DeviceModel.findOne({device_id:device_id},{_id:0,max_stocks:1});
        if (response) {
            return res.status(200).json({
                message: "device max stock get successfully",
                data: response
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        })
    }
}

export const updateAvailableStock = async (req: Request, res: Response) => {
    try {
        const { device_id, available_stocks } = req.body;
        const response = await DeviceModel.updateOne(
            { device_id: device_id },
            {
                $set: {
                    available_stocks: available_stocks
                }
            }
        );
        if (response) {
            return res.status(200).json({
                message: "data updated successfully",
                data: response
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        })
    }
}

export const updateMaxStock = async (req: Request, res: Response) => {
    try {
        const { device_id, max_stocks } = req.body;
        const response = await DeviceModel.updateOne(
            { device_id: device_id },
            {
                $set: {
                    max_stocks: max_stocks
                }
            }
        );
        if (response) {
            return res.status(200).json({
                message: "data updated successfully",
                data: response
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        })
    }
}
