import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import StockModel from "../../model/stock.schema";
import { MESSAGE } from "../../constants/message";
import DeviceModel from "../../model/deviceSchema";

export const getMonthlySales = async (req: Request, res: Response) => {
  try {
    const monthlySales = await StockModel.aggregate([
      {
        $addFields: {
          date: { $toDate: "$date" }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" }
          },
          totalSales: { $sum: "$today_sell_count" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          totalSales: 1
        }
      }
    ]);

    res.status(200).json(monthlySales);
  } catch (error) {
    console.error("Error fetching monthly sales data:", error);
    res.status(500).json({
      message: "Failed to fetch data",
      error: error,
    });
  }
};

export const getDevicesCreatedMonthly = async (req: Request, res: Response) => {
    try {
      const devicesCreatedMonthly = await DeviceModel.aggregate([
        {
          $addFields: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          }
        },
        {
          $group: {
            _id: {
              month: "$month",
              year: "$year"
            },
            totalDevices: { $sum: 1 }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalDevices: 1
          }
        }
      ]);
  
      res.status(StatusCodes.OK).json(devicesCreatedMonthly);
    } catch (error) {
      console.error("Error fetching devices created data:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to fetch data",
        error: error
      });
    }
  };