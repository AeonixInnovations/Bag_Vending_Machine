// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Select,
//   Typography,
// } from "@material-tailwind/react";
// import Chart from "react-apexcharts";
// import {
//   ChartBarIcon,
//   PresentationChartLineIcon,
// } from "@heroicons/react/24/outline";
// import {
//   getSalesbyMonthlyWeek,
//   getSalesbyWeek,
//   getTotalSell,
// } from "../../../utils/apis/Apis";

// const MonthlySalesBarChart = () => {
//   const [chartData, setChartData] = useState<any>({
//     type: "area",
//     height: 300,
//     series: [{ name: "Sales", data: [] }],
//     options: {
//       chart: {
//         toolbar: { show: false },
//       },
//       title: { show: "" },
//       dataLabels: { enabled: false },
//       colors: ["#66ff66"],
//       plotOptions: {
//         bar: {
//           columnWidth: "80%",
//           borderRadius: 2,
//         },
//       },
//       xaxis: {
//         axisTicks: { show: false },
//         axisBorder: { show: false },
//         labels: {
//           style: {
//             colors: "#616161",
//             fontSize: "12px",
//             fontFamily: "inherit",
//             fontWeight: 400,
//           },
//         },
//         categories: [],
//       },
//       yaxis: {
//         labels: {
//           style: {
//             colors: "#616161",
//             fontSize: "12px",
//             fontFamily: "inherit",
//             fontWeight: 400,
//           },
//         },
//       },
//       grid: {
//         show: true,
//         borderColor: "#d9d9d9",
//         strokeDashArray: 1,
//         xaxis: {
//           lines: { show: true },
//         },
//         padding: { top: 5, right: 20 },
//       },
//       fill: { opacity: 0.8 },
//       tooltip: { theme: "light" },
//     },
//   });

//   const [selectedOption, setSelectedOption] = useState("Monthly");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response: any;
//         if (selectedOption === "Monthly") {
//           response = await getTotalSell();
//         } else if (selectedOption === "Daily") {
//           response = await getSalesbyWeek();
//         } else {
//           response = await getSalesbyMonthlyWeek();
//         }
//         const salesData = response.data;

//         const categories = salesData.map((data: any) => {
//           return selectedOption === "Monthly"
//             ? `${data.month}-${data.year}`
//             : selectedOption === "Daily"
//             ? `${data.day}`
//             : `${data.week}`;
//         });
//         const sales = salesData.map((data: any) => data.totalSales);

//         setChartData((prevState: any) => ({
//           ...prevState,
//           series: [{ name: "Sales", data: sales }],
//           options: {
//             ...prevState.options,
//             xaxis: {
//               ...prevState.options.xaxis,
//               categories,
//             },
//           },
//         }));
//       } catch (error) {
//         console.error("Error fetching sales data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedOption]);

//   return (
//     <Card className="w-full md:w-1/2 mx-auto mb-10 ">
//       <CardHeader
//         floated={false}
//         shadow={false}
//         color="transparent"
//         className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
//       >
//         <div className="w-max rounded-lg bg-green-500 p-4 text-white">
//           <PresentationChartLineIcon className="h-8 w-8 " />
//         </div>
//         <div>
//           <select
//             value={selectedOption}
//             onChange={(e: any) => setSelectedOption(e.target.value)}
//             className="mt-2"
//           >
//             <option value="Monthly">Monthly Bag Sales Chart</option>
//             <option value="Weekly">Weekly Bag Sales Chart</option>
//             <option value="Daily">Daily Bag Sales Chart</option>
//           </select>
//         </div>
//       </CardHeader>
//       <CardBody className="px-2 pb-0">
//         <Chart {...chartData} />
//       </CardBody>
//     </Card>
//   );
// };

// export default MonthlySalesBarChart;

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig: any = {
  type: "area",
  height: 300,
  series: [
    {
      name: "Sales",
      data: [90, 80, 300, 320, 500, 350, 250, 380, 500],
    },
    {
      name: "Sales",
      data: [40, 60, 180, 250, 300, 202, 206, 159, 460],
    },
    {
      name: "Sales",
      data: [10, 40, 70, 120, 100, 150, 70, 130, 50],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#99ffbb", "#ffff99", "#99ccff"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function Example({ title }: any) {
  return (
    <Card className="w-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="text-left flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        {/* <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div> */}
        <div>
          <Typography variant="h6" color="blue-gray">
            {/* Line Chart */}
            {title}
          </Typography>
          {/* <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            @material-tailwind/react chart plugin.
          </Typography> */}
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
