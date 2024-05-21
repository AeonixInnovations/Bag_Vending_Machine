import { Request, Response } from "express";
import DeviceModel from "../model/deviceSchema";
import { DeviceInterface } from "../@types/interface/DeviceInterface";
import { date } from "../services/date/date.service";
import dayjs from "dayjs";


export const registerNewDevice = async (req: Request, res: Response) => {
    // const { device_id, stock, address, max_stocks, available_stocks,machine_contact_number , date} = req.body;
    const { device_id,address,machine_contact_number , date} = req.body;
    if (!device_id ) {
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
            const payload: Object = {
                date: dayjs(date,"DD/MM/YYYY"),
                device_id: device_id,
                address: address,
                available_stocks: 0,
                machine_contact_number: machine_contact_number
            }
            const response = await DeviceModel.create(payload);
            console.log(response);
            if (response) {
                return res.status(201).json({
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

// export const getAllDeviceList = async (req: Request, res: Response) => {
//     try {
//         const response = await DeviceModel.find({});
//         if (response) {
//             return res.status(200).json({
//                 message: "device list get successfully",
//                 data: response
//             })
//         }
//     }
//     catch (error) {
//         return res.status(400).json({
//             message: "error in server",
//             error
//         })
//     }
// }
export const getAllDeviceList = async (req: Request, res: Response) => {
    console.log(req.query.page,req.query.perPageItem)
    try {
        const page: number = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const perPage: number = req.query.perPageItem ? parseInt(req.query.perPageItem as string, 10) : 10;

        if (isNaN(page) || isNaN(perPage) || page < 1 || perPage < 1) {
            return res.status(400).json({
                message: "Invalid page or perPageItem value"
            });
        }

        const skip: number = (page - 1) * perPage;
        const devices = await DeviceModel.find({})
            .skip(skip)
            .limit(perPage);

        const totalDevices: number = await DeviceModel.countDocuments({});
        const totalPages: number = Math.ceil(totalDevices / perPage);

        return res.status(200).json({
            message: "Device list fetched successfully",
            data: devices,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error("Error in getAllDeviceList:", error);
        return res.status(500).json({
            message: "Error in server"
        });
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
                    available_stocks: available_stocks,
                    last_update: new Date()
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
/****************************** */

export const fetchDeviceData = async (req:Request, res: Response)=> {
    const {device_id} = req.body;
    console.log(device_id);
    try{
        //send msg to the device
        

        //send device id as response
        // const response = {device_id: device_id};
        const response = await DeviceModel.find({device_id: device_id}).select("-__v");
        console.log(device_id);
        return res.status(200).json({
            message: "device id send",
            data: response
        })
        
    }
    catch(error){
        return res.status(500).json({
            message: "internal server error",
            error
    })
}
}