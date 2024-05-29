import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MESSAGE } from "../../constants/message";
import DeviceModel from "../../model/deviceSchema";
import StockModel from "../../model/stock.schema";
import {
  formatDateFromDDMMYYYY,
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
      //if document not found
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
      device.available_stocks = device.available_stocks + refillCount;
      await device.save();
    } else {
      //if document found
      const updatedRefillCount = stockDetail.refillCount + refillCount;

      const updatedRefillDetails = [
        ...(stockDetail.refillDetails || []),
        refillCount,
      ];
      const updatedRefiller = [...(stockDetail.refiller || []), refiller];

      let payload: any;
      payload = {
        todays_stock: stockDetail.todays_stock + refillCount,
        refillCount: updatedRefillCount,
        currentStock: device.available_stocks + refillCount,
        refiller: updatedRefiller,
        refillDetails: updatedRefillDetails,
      };

      if (
        stockDetail.todays_stock - stockDetail.today_sell_count <
        stockDetail.currentStock
      ) {
        payload = {
          todays_stock: stockDetail.todays_stock + refillCount,
          refillCount: updatedRefillCount,
          currentStock: device.available_stocks,
          refiller: updatedRefiller,
          refillDetails: updatedRefillDetails,
          today_sell_count:
            stockDetail.today_sell_count +
            (refillCount - stockDetail.currentStock),
        };
      } else {
        device.available_stocks = device.available_stocks + refillCount;
        await device.save();
      }
      console.log(payload);
      savedStock = await StockModel.findOneAndUpdate(
        { device_id, date: today },
        { $set: payload },
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

// export const updateStockForDevice = async (req: Request, res: Response) => {
//   try {
//     const { device_id, currentStock } = req.body;

//     const device = await DeviceModel.findOne({ device_id: device_id });
//     if (!device) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         message: MESSAGE.post.fail,
//       });
//     }

//     const date = new Date();
//     const today = new Date(
//       formateMongoDateService(date.toISOString().split("T")[0])
//     );

//     const stockDetail = await StockModel.findOne({
//       device_id: device_id,
//       date: today,
//     });

//     const oldStock: number = device.available_stocks;
//     let today_sell_count: number = 0;
//     let todays_stock: number = device.available_stocks;
//     const MAX_STOCK = 200;
//     let payload: any;
//     if (oldStock >= currentStock) {
//       today_sell_count = oldStock - currentStock;
//       todays_stock = oldStock;
//     } else {
//       today_sell_count = MAX_STOCK - currentStock;
//     }

//     if (!stockDetail) {
//       payload = {
//         device_id,
//         currentStock,
//         today_sell_count,
//         todays_stock,
//         date: today,
//       };
//     } else {
//       payload = {
//         currentStock,
//         today_sell_count,
//       };
//     }

//     const updateInstance = await StockModel.findOneAndUpdate(
//       { date: getCurrentMongoDBFormattedDate(), device_id },
//       {
//         $set: {
//           payload,
//         },
//       }
//     );

//     const deviceResponse = await DeviceModel.findOneAndUpdate(
//       { device_id: device_id },
//       { $set: { available_stocks: currentStock } }
//     );

//     return res.status(200).json({
//       message: MESSAGE.patch.succ,
//       result: updateInstance,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: MESSAGE.patch.fail,
//       error,
//     });
//   }
// };

/*********************************************************
 *
 *
 *
 */

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
    const device = await DeviceModel.findOne({ device_id: device_id });
    if (!device) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGE.patch.fail,
      });
    }
    // console.log(device_id, device, currentStock);

    // Get today's date without the time part
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    const date = new Date();
    const today = new Date(
      formateMongoDateService(date.toISOString().split("T")[0])
    );

    const oldStock: number = device.available_stocks;
    let today_sell_count: number = 0;
    let todays_stock: number = device.available_stocks;
    const MAX_STOCK = 200;
    let payload: any;

    // Find the stock entry for today
    const stock = await StockModel.findOne({
      device_id: device_id,
      // date: formateMongoDateService(String(today)),
      date: today,
    });

    if (!stock) {
      //if document not found
      // if (oldStock >= currentStock) {
      //   today_sell_count = oldStock - currentStock;
      //   todays_stock = oldStock;
      // } else {
      //   today_sell_count = MAX_STOCK - currentStock;
      // }
      payload = {
        device_id,
        currentStock: currentStock,
        today_sell_count,
        todays_stock: currentStock,
        date: today,
      };
    } else {
      //if document found
      if (oldStock >= currentStock) {
        today_sell_count = stock.todays_stock - currentStock;
        console.log(today_sell_count);
        // todays_stock = oldStock;
      } else {
        // today_sell_count = MAX_STOCK - currentStock;
        today_sell_count = stock.today_sell_count;
      }
      payload = {
        currentStock: currentStock,
        today_sell_count,
      };
    }
    const updateInstance = await StockModel.findOneAndUpdate(
      { date: today, device_id: device_id },
      {
        $set: payload,
      },
      {
        upsert: true, // This creates a new document if no matching document is found
        new: true, // This returns the updated document
      }
    );

    device.available_stocks = currentStock;
    await device.save();

    return res.status(StatusCodes.OK).json({
      message: MESSAGE.patch.succ,
      stock: updateInstance,
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

// export const updateStockForDevice = async (req: Request, res: Response) => {
//   try {
//     const { device_id } = req.params;
//     const { currentStock } = req.body;

//     if (typeof currentStock !== "number") {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         message: MESSAGE.patch.fail,
//       });
//     }

//     // Find the device
//     const device = await DeviceModel.findOne({ device_id });
//     if (!device) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         message: MESSAGE.patch.fail,
//       });
//     }

//     // Get today's date without the time part
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Find the stock entry for today
//     console.log(device_id);
//     const stock = await StockModel.findOne({
//       device_id: device_id,
//       date: formateMongoDateService(String(today)),
//     });

//     console.log("=====>date", getCurrentMongoDBFormattedDate());
//     if (!stock) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         message: MESSAGE.patch.fail,
//         error: "Stock for today not found.",
//       });
//     }

//     stock.currentStock = currentStock;
//     const updatedStock = await stock.save();

//     device.available_stocks = currentStock;
//     await device.save();

//     return res.status(StatusCodes.OK).json({
//       message: MESSAGE.patch.succ,
//       stock: updatedStock,
//       device: device,
//     });
//   } catch (error: any) {
//     console.error("Error updating stock for device:", error);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: MESSAGE.patch.fail,
//       error: error.message,
//     });
//   }
// };

export const getRefillStockDetails = async (req: Request, res: Response) => {
  const { deviceId, startDate, endDate }: any = req.query;
  const formattedStartDate = formatDateFromDDMMYYYY(startDate);
  const formattedEndDate = formatDateFromDDMMYYYY(endDate);
  console.log(formattedStartDate, formattedEndDate);
  if (!deviceId || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters" });
  }

  const parsedStartDate = new Date(formattedStartDate);
  const parsedEndDate = new Date(formattedEndDate).setHours(23, 59, 59, 999);
  console.log(
    "startDate : " + parsedStartDate + "   endDate : " + parsedEndDate
  );
  try {
    const stockDetails = await StockModel.find({
      device_id: deviceId,
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
      refillCount: { $ne: 0 },
    });

    if (!stockDetails || stockDetails.length === 0) {
      return res.status(404).json({
        message:
          "No stock details found for this device in the specified date range",
      });
    }

    res.status(200).json({
      message: "Refill Stock details found successfully",
      length: stockDetails.length,
      result: stockDetails,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
