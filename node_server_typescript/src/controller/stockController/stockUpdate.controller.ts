import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MESSAGE } from "../../constants/message";
import DeviceModel from "../../model/deviceSchema";
import StockModel from "../../model/stock.schema";
import { formateMongoDateService, getCurrentMongoDBFormattedDate } from "../../services/date/date.service";

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

export const updateStockForDevice = async (req: Request, res: Response) => {
  try {
    const { device_id } = req.params;
    const { currentStock } = req.body;

    if (typeof currentStock !== "number") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGE.patch.fail,
      });
    }

    // Find the device
    const device = await DeviceModel.findOne({ device_id });
    if (!device) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGE.patch.fail,
      });
    }

    // Get today's date without the time part
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find the stock entry for today
    console.log(device_id)
    const stock = await StockModel.findOne({
      device_id: device_id,
      date: formateMongoDateService(String(today))
    });
    
    console.log("=====>date",getCurrentMongoDBFormattedDate());
    if (!stock) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGE.patch.fail,
        error: "Stock for today not found.",
      });
    }

    stock.currentStock = currentStock;
    const updatedStock = await stock.save();

    device.available_stocks = currentStock;
    await device.save();

    return res.status(StatusCodes.OK).json({
      message: MESSAGE.patch.succ,
      stock: updatedStock,
      device: device,
    });
  } catch (error: any) {
    console.error("Error updating stock for device:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.patch.fail,
      error: error.message,
    });
  }
};