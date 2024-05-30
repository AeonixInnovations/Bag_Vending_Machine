import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import {
  getDeviceWiseSales,
  getRegisterDevice,
} from "../../../utils/apis/Apis";

const MonthlySalesBarChart = () => {
  const [chartData, setChartData] = useState<any>({
    type: "bar",
    height: 290,
    series: [{ name: "Machines registered", data: [] }],
    options: {
      chart: {
        toolbar: { show: false },
      },
      title: { show: "" },
      dataLabels: { enabled: false },
      colors: ["#80bfff"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [],
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
          lines: { show: true },
        },
        padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: "dark" },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await getDeviceWiseSales();
        const salesData = response.data;

        const categories = salesData.map((data: any) => `${data.device_id}`);
        const sales = salesData.map((data: any) => data.totalSales);

        setChartData((prevState: any) => ({
          ...prevState,
          series: [{ name: "Machines registered", data: sales }],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="w-full md:w-1/2 mx-auto mb-10">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-blue-600 p-4 text-white">
          <ChartBarIcon className="h-8 w-8" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Monthly Sales Chart
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartData} />
      </CardBody>
    </Card>
  );
};

export default MonthlySalesBarChart;
