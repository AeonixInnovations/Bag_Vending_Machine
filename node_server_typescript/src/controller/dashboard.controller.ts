import { Request, Response } from "express";
import DeviceModel from "../model/deviceSchema";
import StockModel from "../model/stock.schema";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import MarketModel from "../model/market.schema";

export const getTotalDevices = async (req: Request, res: Response) => {
  try {
    const response = await DeviceModel.find();

    return res.status(200).json({
      message: "Device Found successfully",
      result: response.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getDispensedCounts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Helper function to get the start of the day
  const getStartOfToday = (): Date => {
    return dayjs().startOf("day").toDate();
  };

  // Helper function to get the start of the month
  const getStartOfMonth = (): Date => {
    return dayjs().startOf("month").toDate();
  };
  const getStartOfWeek = (): Date => {
    return dayjs().startOf("isoWeek").toDate();
  };

  try {
    const startOfToday = getStartOfToday();
    const startOfMonth = getStartOfMonth();
    const startOfWeek = getStartOfWeek();

    const aggregation = [
      {
        $group: {
          _id: null,
          totalDispensedAllTime: { $sum: "$todaySellCount" },
          totalDispensedCurrentMonth: {
            $sum: {
              $cond: [
                { $gte: ["$date", startOfMonth] },
                "$today_sell_count",
                0,
              ],
            },
          },
          totalDispensedCurrentWeek: {
            $sum: {
              $cond: [{ $gte: ["$date", startOfWeek] }, "$today_sell_count", 0],
            },
          },
          totalDispensedToday: {
            $sum: {
              $cond: [
                { $gte: ["$date", startOfToday] },
                "$today_sell_count",
                0,
              ],
            },
          },
        },
      },
    ];

    const result = await StockModel.aggregate(aggregation);

    const dispensedCounts = result[0] || {
      totalDispensedAllTime: 0,
      totalDispensedCurrentMonth: 0,
      totalDispensedCurrentWeek: 0,
      totalDispensedToday: 0,
    };

    return res.status(200).json({
      message: "Dispensed counts fetched successfully",
      data: dispensedCounts,
    });
  } catch (error: any) {
    console.error("Error fetching dispensed counts:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getOutOfBagCount = async (req: Request, res: Response) => {
  try {
    const outOfBagCount = await DeviceModel.find({ available_stocks: 0 });

    return res.status(200).json({
      message: "Data found successfully",
      result: outOfBagCount.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTotalMarketCount = async (req: Request, res: Response) => {
  try {
    const totalMarketDetails = await MarketModel.find();
    if (!totalMarketDetails) {
      return res.status(404).json({
        message: "No data found",
      });
    }
    res.status(200).json({
      message: "Data found successfully",
      result: totalMarketDetails.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};
export const getOutOfOrderCount = async (req: Request, res: Response) => {
  try {
    const outOfOrderCount = await DeviceModel.find({ available_stocks: 0 });

    return res.status(200).json({
      message: "Data found successfully",
      result: outOfOrderCount.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
