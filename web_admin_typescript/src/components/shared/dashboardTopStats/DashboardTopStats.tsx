import React, { useEffect, useState } from "react";
import SmallCard from "../smallCard/SmallCard";
import {
  CalendarDaysIcon,
  CalendarIcon,
  ComputerDesktopIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TruckIcon,
  CogIcon,
  ExclamationCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import {
  getDeviceDetails,
  getSellDetails,
  getTotalMarket,
} from "../../../utils/apis/Apis";

const DashboardTopStats = () => {
  const [sales, setsales] = useState<any>();
  const [devices, setDevices] = useState<any>();
  const [markets, setMarkets] = useState<any>();
  const getAllSales = async () => {
    const response = await getSellDetails();
    console.log(response);
    setsales(response?.data);
  };
  const getAllDevices = async () => {
    const response = await getDeviceDetails();
    console.log(response);
    setDevices(response?.data);
  };
  const getAllMarkets = async () => {
    const response = await getTotalMarket();
    setMarkets(response?.data);
  };

  const rows = [
    [
      {
        title: "Total Machines",
        count: devices?.totalDevices || "NA",
        icon: ComputerDesktopIcon,
        color: "bg-green-600",
      },
      {
        title: "Total Markets",
        count: markets?.result || "NA",
        icon: MapPinIcon,
        color: "bg-cyan-400",
      },
      {
        title: "Machines Working",
        count: devices?.workingDeviceCount || "NA",
        icon: CogIcon,
        color: "bg-green-600",
      },
      {
        title: "Machines Out of Order",
        count: devices?.outOfOrderDeviceCount || "NA",
        icon: WrenchScrewdriverIcon,
        color: "bg-red-600",
      },
      {
        title: "Machines Out of Bag",
        count: devices?.devicesWithZeroStocks || "NA",
        icon: ExclamationCircleIcon,
        color: "bg-amber-600",
      },
    ],
    [
      {
        title: "Total Bags Dispensed",
        count: sales?.totalSales || "NA",
        icon: ShoppingBagIcon,
        color: "bg-blue-600",
      },
      {
        title: "Bags Dispensed This Month",
        count: sales?.currentMonthSales || "NA",
        icon: ShoppingBagIcon,
        color: "bg-blue-600",
      },
      {
        title: "Bags Dispensed This Week",
        count: sales?.currentWeekSales || "NA",
        icon: ShoppingBagIcon,
        color: "bg-blue-600",
      },
      {
        title: "Bags Dispensed Today",
        count: sales?.currentDaySales || "NA",
        icon: ShoppingBagIcon,
        color: "bg-blue-600",
      },
    ],
  ];

  useEffect(() => {
    getAllSales();
    getAllDevices();
    getAllMarkets();
  }, []);

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between px-10 gap-5 mt-5">
          {row.map((card, cardIndex) => (
            <SmallCard
              key={cardIndex}
              title={card.title}
              count={card.count}
              Icon={card.icon}
              color={card.color}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default DashboardTopStats;
