import StockModel from "../../model/stock.schema";
import {
  formateMongoDateService,
  getStartOfMonth,
  getStartOfToday,
  getStartOfWeek,
} from "../date/date.service";

// total bag, monthly, weekly, today - dispensed
export const getBagDispensedCountService = async () => {
  const date = new Date();
  const today = new Date(
    formateMongoDateService(date.toISOString().split("T")[0])
  );

  //   const getStartOfToday = (): Date => {
  //     return dayjs().startOf("day").toDate();
  //   };
  //   // Helper function to get the start of the month
  //   const getStartOfMonth = (): Date => {
  //     return dayjs().startOf("month").toDate();
  //   };
  //   const getStartOfWeek = (): Date => {
  //     return dayjs().startOf("isoWeek").toDate();
  //   };

  try {
    const startOfToday = getStartOfToday();
    const startOfMonth = getStartOfMonth();
    const startOfWeek = getStartOfWeek();
    console.log(startOfToday, startOfWeek, startOfMonth);
    const aggregation = [
      {
        $group: {
          _id: null,
          totalDispensedAllTime: { $sum: "$today_sell_count" },
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

    return dispensedCounts;
    // return res.status(200).json({
    //   message: "Dispensed counts fetched successfully",
    //   data: dispensedCounts,
    // });
  } catch (error: any) {
    throw error;
    // return res.status(500).json({
    //   message: "Internal server error",
    //   error: error.message,
    // });
  }
};

//
