import React, { useEffect, useState } from "react";
import SmallCard from "../smallCard/SmallCard";
import { CalendarDaysIcon, CalendarIcon, ComputerDesktopIcon, CurrencyRupeeIcon, MapPinIcon, ShoppingBagIcon, SunIcon, TruckIcon } from "@heroicons/react/24/outline";
import { getDeviceDetails, getSellDetails } from "../../../utils/apis/Apis";

const DashboardTopStats = () => {

  const [sales, setsales] = useState<any>()
  const [devices, setDevices] = useState<any>()
  const getAllSales=async()=>{
    const response = await getSellDetails()
    console.log(response)
    setsales(response?.data)
  }
  const getAllDevices=async()=>{
    const response = await getDeviceDetails()
    console.log(response)
    setDevices(response?.data)
  }
  const rows = [
    [
      { title: "Total Machines", count: devices?.totalDevices , icon: ComputerDesktopIcon},
      { title: "Total Markets", count: 541 ,icon: MapPinIcon },
      { title: "Machines Working", count: devices?.totalDevices- devices?.devicesWithZeroStocks,icon: TruckIcon},
      { title: "Machines Out of Order", count: devices?.devicesWithZeroStocks ,icon: TruckIcon },
    ],
    [
      { title: "Total Bags Dispensed", count: sales?.totalSales ,icon: ShoppingBagIcon},
      { title: "Bags Dispensed This Month", count: sales?.currentMonthSales ,icon: CalendarIcon },
      { title: "Bags Dispensed This Week", count: sales?.currentWeekSales,icon: CalendarDaysIcon   },
      { title: "Bags Dispensed Today", count: sales?.currentDaySales ,icon: SunIcon  },
    ],
  ];

  useEffect(() => {
    getAllSales()
    getAllDevices()
  }, [])
  
  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between px-10 gap-5 mt-5">
          {row.map((card, cardIndex) => (
            <SmallCard key={cardIndex} title={card.title} count={card.count} Icon={card.icon} />
          ))}
        </div>
      ))}
    </>
  );
};

export default DashboardTopStats;
