import React from "react";
import SmallCard from "../smallCard/SmallCard";
import { CalendarDaysIcon, CalendarIcon, ComputerDesktopIcon, CurrencyRupeeIcon, MapPinIcon, ShoppingBagIcon, SunIcon, TruckIcon } from "@heroicons/react/24/outline";

const DashboardTopStats = () => {
  const rows = [
    [
      { title: "Total Machines", count: 163 , icon: ComputerDesktopIcon},
      { title: "Total Markets", count: 265 ,icon: MapPinIcon },
      { title: "Machines Working", count: 65 ,icon: TruckIcon},
      { title: "Machines Out of Order", count: 20 ,icon: TruckIcon },
    ],
    [
      { title: "Total Bags Dispensed", count: 605 ,icon: ShoppingBagIcon},
      { title: "Bags Dispensed This Month", count: 465 ,icon: CalendarIcon },
      { title: "Bags Dispensed This Week", count: 105,icon: CalendarDaysIcon   },
      { title: "Bags Dispensed Today", count: 35 ,icon: SunIcon  },
    ],
  ];

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
