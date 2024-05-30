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

export const getWeeklySales = async (req: Request, res: Response) => {
  try {
    const allWeeks = Array.from({ length: 52 }, (_, i) => i + 1);

    const weeklySales = await StockModel.aggregate([
      {
        $addFields: {
          date: {
            $cond: {
              if: { $type: "$date" },
              then: "$date",
              else: { $toDate: "$date" }
            }
          },
          week: { $isoWeek: { $toDate: "$date" } },
          year: { $year: { $toDate: "$date" } }
        }
      },
      {
        $group: {
          _id: {
            week: "$week",
            year: "$year"
          },
          totalSales: { $sum: "$today_sell_count" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.week": 1 }
      },
      {
        $project: {
          _id: 0,
          week: "$_id.week",
          year: "$_id.year",
          totalSales: 1
        }
      }
    ]);

    const weeklySalesMap = new Map();
    weeklySales.forEach(({ week, totalSales }) => {
      weeklySalesMap.set(week, totalSales);
    });

    const mergedData = allWeeks.map(week => ({
      week,
      totalSales: weeklySalesMap.has(week) ? weeklySalesMap.get(week) : 0,
      year: new Date().getFullYear() 
    }));

    res.status(200).json(mergedData);
  } catch (error) {
    console.error("Error fetching weekly sales data:", error);
    res.status(500).json({
      message: "Failed to fetch data",
      error: error,
    });
  }
};

export const getMonthlyWeeklySales = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear();

    const weeksInMonth = getWeeksInMonth(currentYear, currentMonth);

    const currentMonthWeeks = Array.from({ length: weeksInMonth }, (_, i) => i + 1);

    const weeklySales = await StockModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentYear, currentMonth - 1, 1), 
            $lt: new Date(currentYear, currentMonth, 1) 
          }
        }
      },
      {
        $addFields: {
          week: { $isoWeek: { $toDate: "$date" } },
          year: { $year: { $toDate: "$date" } }
        }
      },
      {
        $group: {
          _id: {
            week: "$week",
            year: "$year"
          },
          totalSales: { $sum: "$today_sell_count" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.week": 1 }
      },
      {
        $project: {
          _id: 0,
          week: "$_id.week",
          year: "$_id.year",
          totalSales: 1
        }
      }
    ]);

    const weeklySalesMap = new Map();
    weeklySales.forEach(({ week, totalSales }) => {
      weeklySalesMap.set(week, totalSales);
    });

    const mergedData = currentMonthWeeks.map(week => ({
      week,
      totalSales: weeklySalesMap.has(week) ? weeklySalesMap.get(week) : 0,
      year: currentYear
    }));

    res.status(200).json(mergedData);
  } catch (error) {
    console.error("Error fetching monthly weekly sales data:", error);
    res.status(500).json({
      message: "Failed to fetch data",
      error: error,
    });
  }
};

function getWeeksInMonth(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1); 
  const lastDay = new Date(year, month, 0); 
  const daysInMonth = lastDay.getDate(); 
  const firstDayWeek = firstDay.getDay(); 
  const remainingDays = daysInMonth - (7 - firstDayWeek); 
  const weeksInMonth = Math.ceil(remainingDays / 7) + 1; 
  return weeksInMonth;
}

export const getMonthlyDailySales = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const dailySales = await StockModel.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentYear, currentMonth - 1, 1), 
            $lt: new Date(currentYear, currentMonth, 1) 
          }
        }
      },
      {
        $addFields: {
          dayOfMonth: { $dayOfMonth: { $toDate: "$date" } },
          year: { $year: { $toDate: "$date" } }
        }
      },
      {
        $group: {
          _id: {
            dayOfMonth: "$dayOfMonth",
            year: "$year"
          },
          totalSales: { $sum: "$today_sell_count" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.dayOfMonth": 1 }
      },
      {
        $project: {
          _id: 0,
          dayOfMonth: "$_id.dayOfMonth",
          year: "$_id.year",
          totalSales: 1
        }
      }
    ]);

    const dailySalesMap = new Map();
    dailySales.forEach(({ dayOfMonth, totalSales }) => {
      dailySalesMap.set(dayOfMonth, totalSales);
    });

    const mergedData = currentMonthDays.map(dayOfMonth => ({
      dayOfMonth,
      totalSales: dailySalesMap.has(dayOfMonth) ? dailySalesMap.get(dayOfMonth) : 0,
      year: currentYear
    }));

    res.status(200).json(mergedData);
  } catch (error) {
    console.error("Error fetching monthly daily sales data:", error);
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

  export const getDeviceCountByAddress = async (req: Request, res: Response) => {
    try {
      const deviceCounts = await StockModel.aggregate([
        {
          $group: {
            _id: "$address",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            address: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]);
  
      const filteredDeviceCounts = deviceCounts.filter(device => device.address !== null);
  
      const formattedResponse = filteredDeviceCounts.reduce((acc, curr) => {
        acc[curr.address] = curr.count;
        return acc;
      }, {});
  
      
      res.status(200).json({
        message: MESSAGE.get.succ,
        error: formattedResponse,
      });
    } catch (error) {
      console.error("Error fetching device counts by address:", error);
      res.status(500).json({
        message:  MESSAGE.get.fail,
        error: error,
      });
    }
  };
  
  