import { Request, Response, response } from "express";
import StockModel from "../model/stock.schema";
import DeviceModel from "../model/deviceSchema";
import { StockInterface } from "../@types/interface/Stock.interface";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Dayjs } from "dayjs";
import { formatDate } from "../services/date/date.service";

function createDate(dateString: string) {
  // Split the input string by '/'
  const [day, month, year] = dateString.split("/");

  // Create a date string in "YYYY-MM-DD" format
  const formattedDateString = `${year}-${month}-${day}`;

  // Create and return a new Date object
  return new Date(formattedDateString);
}

const calculateSellCount = (
  available_stock: number,
  refillCount: number,
  currentStock: number
) => {
  if (available_stock > currentStock) {
    if (available_stock - currentStock >= refillCount) {
      return available_stock - currentStock + refillCount;
    }
    // else if(available_stock - currentStock === refillCount)
    //     return available_stock - currentStock + refillCount;
  } else if (available_stock < currentStock) {
    if (currentStock - available_stock <= refillCount) {
      return Math.abs(currentStock - available_stock - refillCount);
    }
  } else if (available_stock == currentStock) {
    return refillCount;
  } else return 0;
};
/**
 *
 */
export const postDailyStock = async (req: Request, res: Response) => {
  const { device_id, date, currentStock } = req.body;
  const FormattedDate = createDate(date);
  if (!device_id || !date || !currentStock) {
    return res.status(422).json({
      message: "fields are empty",
    });
  }

  try {
    //get available_stock
    const deviceDetails = await DeviceModel.findOne({ device_id: device_id });
    if (!deviceDetails) {
      return res.status(404).json({
        message: "Device not found",
      });
    }
    const available_stock: number = deviceDetails.available_stocks;
    let refillCount: number;
    //check the document already created or not
    const stockDetails = await StockModel.findOne({ device_id: device_id });
    if (!stockDetails) {
      refillCount = 0;
    } else {
      refillCount = stockDetails.refillCount;
    }
    const sellCount = calculateSellCount(
      available_stock,
      refillCount,
      currentStock
    );
    console.log(sellCount);
    const payload: object = {
      device_id: device_id,
      date: FormattedDate,
      // date: dayjs(date, "DD/MM/YYYY").subtract(0, "day").format("DD/MM/YYYY"),
      todaySellCount: sellCount,
      currentStock: currentStock,
    };
    const options: Object = {
      upsert: true, // Create a new document if no document matches the query
      new: true, // Return the modified document rather than the original
      // setDefaultsOnInsert: true, // Set default values for fields if upserting
    };

    const newStockDetails = await StockModel.findOneAndUpdate(
      { device_id: device_id, date: FormattedDate },
      { $set: payload },
      options
    );
    if (!newStockDetails) {
      return res.status(400).json({
        message: "Stock not updated successfully",
      });
    }
    const deviceDetailsUpdate = await DeviceModel.findOneAndUpdate(
      { device_id: device_id },
      { $set: { available_stocks: currentStock } },
      options
    );
    if (!deviceDetailsUpdate) {
      return res.status(400).json({
        message: "Device Details not updated successfully",
      });
    }

    res.status(201).json({
      message: "Stock updated",
      result: newStockDetails,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
      error,
    });
  }
};
/**
 *
 *
 *
 */
export const postRefillCount = async (req: Request, res: Response) => {
  const { device_id, date, refillCount } = req.body;
  const formattedDate = createDate(date);
  console.log("date in  refill", formattedDate);
  if (!device_id || !date || !refillCount) {
    return res.status(422).json({
      message: "fields are empty",
    });
  }
  try {
    const deviceDetails = await DeviceModel.findOne({ device_id: device_id });
    if (!deviceDetails) {
      return res.status(404).json({
        meessage: "Device not found",
      });
    }

    const yesterday = createDate(date);
    yesterday.setDate(formattedDate.getDate() - 1);

    let available_stock: number;
    const oldStockDetails = await StockModel.findOne({
      device_id: device_id,
      date: yesterday,
    });
    let sellCount, currentStock;

    if (!oldStockDetails) {
      available_stock = deviceDetails.available_stocks;
    } else {
      available_stock = oldStockDetails.currentStock;
    }
    console.log("available_stock", available_stock);

    const currentStockDetails = await StockModel.findOne({
      device_id: device_id,
      date: new Date(),
    });
    if (currentStockDetails) {
      console.log(currentStockDetails);
      currentStock = currentStockDetails.currentStock;
      sellCount = calculateSellCount(
        available_stock,
        refillCount,
        currentStock
      );
    } else {
      sellCount = 0;
    }

    console.log(sellCount);

    const payload: Object = {
      device_id: device_id,
      date: formattedDate,
      refillCount: refillCount,
      todaySellCount: sellCount,
    };
    const options: Object = {
      upsert: true, // Create a new document if no document matches the query
      new: true, // Return the modified document rather than the original
      setDefaultsOnInsert: true, // Set default values for fields if upserting
    };
    const newStockDetails = await StockModel.findOneAndUpdate(
      { device_id: device_id, date: formattedDate },
      { $set: payload },
      options
    );
    if (!newStockDetails) {
      return res.status(400).json({
        message: "Stock not updated successfully",
      });
    }
    res.status(201).json({
      message: "Stock updated",
      result: payload,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getRefillStockDetails = async (req: Request, res: Response) => {
  const { deviceId, startDate, endDate }: any = req.query;
  const formattedStartDate = createDate(startDate);
  const formattedEndDate = createDate(endDate);

  if (!deviceId || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters" });
  }

  // Parse dates using Day.js
  // const parsedStartDate = dayjs(startDate, 'DD/MM/YYYY').startOf('day').toDate();
  const parsedStartDate = formattedStartDate;
  const parsedEndDate = formattedEndDate.setHours(23, 59, 59, 999);
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
    });

    if (!stockDetails || stockDetails.length === 0) {
      return res
        .status(404)
        .json({
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
