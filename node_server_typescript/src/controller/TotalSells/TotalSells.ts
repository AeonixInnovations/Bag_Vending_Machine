import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import StockModel from "../../model/stock.schema";
import { MESSAGE } from "../../constants/message";

export const getSalesData = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentDayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDay - currentDayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDay + (6 - currentDayOfWeek));
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const salesData = await StockModel.aggregate([
      {
        $facet: {
          totalSales: [
            {
              $group: {
                _id: null,
                totalSales: { $sum: "$today_sell_count" }
              }
            },
            {
              $project: {
                _id: 0,
                totalSales: 1
              }
            }
          ],
          currentYearSales: [
            {
              $match: {
                date: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31`) }
              }
            },
            {
              $group: {
                _id: null,
                totalSales: { $sum: "$today_sell_count" }
              }
            },
            {
              $project: {
                _id: 0,
                totalSales: 1
              }
            }
          ],
          currentMonthSales: [
            {
              $match: {
                date: {
                  $gte: new Date(`${currentYear}-${currentMonth}-01`),
                  $lte: new Date(`${currentYear}-${currentMonth + 1}-01`)
                }
              }
            },
            {
              $group: {
                _id: null,
                totalSales: { $sum: "$today_sell_count" }
              }
            },
            {
              $project: {
                _id: 0,
                totalSales: 1
              }
            }
          ],
          currentWeekSales: [
            {
              $match: {
                date: {
                  $gte: startOfWeek,
                  $lte: endOfWeek
                }
              }
            },
            {
              $group: {
                _id: null,
                totalSales: { $sum: "$today_sell_count" }
              }
            },
            {
              $project: {
                _id: 0,
                totalSales: 1
              }
            }
          ],
          currentDaySales: [
            {
              $match: {
                date: {
                  $gte: startOfDay,
                  $lte: endOfDay
                }
              }
            },
            {
              $group: {
                _id: null,
                totalSales: { $sum: "$today_sell_count" }
              }
            },
            {
              $project: {
                _id: 0,
                totalSales: 1
              }
            }
          ]
        }
      }
    ]);

    const response = {
      totalSales: salesData[0].totalSales[0]?.totalSales || 0,
      currentYearSales: salesData[0].currentYearSales[0]?.totalSales || 0,
      currentMonthSales: salesData[0].currentMonthSales[0]?.totalSales || 0,
      currentWeekSales: salesData[0].currentWeekSales[0]?.totalSales || 0,
      currentDaySales: salesData[0].currentDaySales[0]?.totalSales || 0
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.get.fail,
      error: error,
    });
  }
};
