import DeviceModel from "../../model/deviceSchema";
import StockModel from "../../model/stock.schema";
import {
  formateMongoDateService,
  getStartOfMonth,
  getStartOfToday,
  getStartOfWeek,
  getYesterdayDate,
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

//total device, out of stock
export const getDeviceCountService = async () => {
  try {
    const results = await DeviceModel.aggregate([
      {
        $facet: {
          totalDevices: [{ $count: "total" }],
          outOfStockDevices: [
            { $match: { available_stocks: 0 } },
            { $count: "outOfStock" },
          ],
        },
      },
    ]);

    // Extract the counts from the results
    const totalDevices = results[0].totalDevices[0]?.total || 0;
    const outOfStockDevices = results[0].outOfStockDevices[0]?.outOfStock || 0;

    return { totalDevices, outOfStockDevices };
  } catch (error) {
    console.error("Error getting device counts:", error);
    throw error;
  }
};

//Out of order

// export const getOutOfOrderCount = async () => {
//   try {
//     const date = new Date();
//     const today = new Date(
//       formateMongoDateService(date.toISOString().split("T")[0])
//     );
//     const yesterday = getYesterdayDate();
//     const result = await StockModel.find({ date: yesterday });
//     if (!result) {
//       const pipeline = [
//         // Match documents for yesterday's date
//         {
//           $match: {
//             date: yesterday,
//           },
//         },
//         // Group by device_id to count unique devices
//         {
//           $group: {
//             _id: "$device_id",
//           },
//         },
//         // Count the number of unique devices
//         {
//           $count: "outOfOrderDeviceCount",
//         },
//       ];

//       const result = await StockModel.aggregate(pipeline);
//     }
//   } catch (error) {
//     throw error;
//   }
// };

//total market
