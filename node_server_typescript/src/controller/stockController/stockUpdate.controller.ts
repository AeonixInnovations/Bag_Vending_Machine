import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MESSAGE } from "../../constants/message";
import DeviceModel from "../../model/deviceSchema";
import StockModel from "../../model/stock.schema";

export const createStockForDevice = async (req: Request, res: Response) => {
  try {
    const { device_id } = req.params;
    const { refillCount ,refiller } = req.body;

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

    const newStock = new StockModel({
      device_id: device_id,
      date: new Date(),
      todaySellCount: device.available_stocks + refillCount,
      refillCount: refillCount,
      currentStock: device.available_stocks + refillCount,
      refiller:refiller
    });

    const savedStock = await newStock.save();

    device.available_stocks = device.available_stocks + refillCount;
    await device.save();

    return res.status(StatusCodes.CREATED).json({
      message:MESSAGE.post.succ,
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
