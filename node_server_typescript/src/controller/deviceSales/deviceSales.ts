import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DeviceModel from "../../model/deviceSchema";
import { MESSAGE } from "../../constants/message";
import { getYesterdayDate } from "../../services/date/date.service";
import StockModel from "../../model/stock.schema";

export const getDeviceData = async (req: Request, res: Response) => {
  try {
    console.log(getYesterdayDate());
    const deviceData = await DeviceModel.aggregate([
      {
        $facet: {
          totalDevices: [
            {
              $count: "totalDevices",
            },
          ],
          devicesWithZeroStocks: [
            {
              $match: {
                available_stocks: 0,
              },
            },
            {
              $count: "devicesWithZeroStocks",
            },
          ],
        },
      },
    ]);
    const stockData = await StockModel.find({ date: getYesterdayDate() });
    const response = {
      totalDevices: deviceData[0].totalDevices[0]?.totalDevices || 0,
      devicesWithZeroStocks:
        deviceData[0].devicesWithZeroStocks[0]?.devicesWithZeroStocks || 0,
      workingDeviceCount: stockData?.length || 0,
      outOfOrderDeviceCount:
        deviceData[0].totalDevices[0]?.totalDevices - stockData?.length,
    };
    console.log(response);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error("Error fetching device data:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.get.fail,
      error: error,
    });
  }
};
