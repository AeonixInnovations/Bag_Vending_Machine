import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MESSAGE } from "../../constants/message";
import DeviceModel from "../../model/deviceSchema";
import StockModel from "../../model/stock.schema";
import {
  formateMongoDateService,
  getCurrentMongoDBFormattedDate,
} from "../../services/date/date.service";

export const createStockForDevice = async (req: Request, res: Response) => {
  try {
    const { device_id } = req.params;
    const { refillCount, refiller } = req.body;

    if (typeof refillCount !== "number") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGE.post.fail,
      });
    }

    const device = await DeviceModel.findOne({ device_id });
    if (!device) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGE.post.fail,
      });
    }
    const date = new Date();
    const today = new Date(
      formateMongoDateService(date.toISOString().split("T")[0])
    );

    const stockDetail = await StockModel.findOne({
      device_id: device_id,
      date: today,
    });

    let newStock: any;
    let savedStock: any;
    if (!stockDetail) {
      newStock = new StockModel({
        device_id: device_id,
        date: today,
        todays_stock: device.available_stocks + refillCount,
        refillCount: refillCount,
        currentStock: device.available_stocks + refillCount,
        refiller: [refiller],
        refillDetails: [refillCount],
      });
      savedStock = await newStock.save();
    } else {
      const updatedRefillDetails = [
        ...(stockDetail.refillDetails || []),
        refillCount,
      ];
      const updatedRefiller = [...(stockDetail.refiller || []), refiller];

      const updatedRefillCount = stockDetail.refillCount + refillCount;
      const payload = {
        todays_stock: stockDetail.todays_stock + refillCount,
        refillCount: updatedRefillCount,
        currentStock: device.available_stocks + refillCount,
        refiller: updatedRefiller,
        refillDetails: updatedRefillDetails,
      };
      savedStock = await StockModel.findOneAndUpdate(
        { device_id, date: today },
        payload,
        { new: true } // To return the updated document
      );
    }
    // const newStock = new StockModel({
    //   device_id: device_id,
    //   date: new Date(),
    //   todays_stock: device.available_stocks + refillCount,
    //   refillCount: refillCount,
    //   currentStock: device.available_stocks + refillCount,
    //   refiller: refiller,
    // });

    device.available_stocks = device.available_stocks + refillCount;
    await device.save();

    return res.status(StatusCodes.CREATED).json({
      message: MESSAGE.post.succ,
      stock: savedStock,
      device: device,
    });
  } catch (error: any) {
    console.error("Error creating stock for device:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.post.fail,
      error: error.message,
    });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const { device_id, stock } = req.body;
    const updateInstance = await StockModel.findOneAndUpdate(
      { date: getCurrentMongoDBFormattedDate(), device_id },
      { $set: { currentStock: stock } }
    );
    return res.status(200).json({
      message: MESSAGE.patch.succ,
      result: updateInstance,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGE.patch.fail,
      error,
    });
  }
};
