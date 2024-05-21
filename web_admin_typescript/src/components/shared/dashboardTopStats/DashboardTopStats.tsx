import React from "react";
import SmallCard from "../smallCard/SmallCard";
import { CalendarDaysIcon, CalendarIcon, ComputerDesktopIcon, CurrencyRupeeIcon, MapPinIcon, ShoppingBagIcon, SunIcon, TruckIcon } from "@heroicons/react/24/outline";

const DashboardTopStats = () => {
  const rows = [
    [
      { title: "Total Machines", count: 163 , icon: ComputerDesktopIcon},
      { title: "Total Markets", count: 265 ,icon: MapPinIcon },
      { title: "Out of order", count: 65 ,icon: TruckIcon},
      { title: "Total sell", count: 105 ,icon: CurrencyRupeeIcon },
    ],
    [
      { title: "Total Bags Dispensed", count: 605 ,icon: ShoppingBagIcon},
      { title: "Bag Dispense this month", count: 465 ,icon: CalendarIcon },
      { title: "Bag Dispense this week", count: 105,icon: CalendarDaysIcon   },
      { title: "Bag Dispense Today", count: 35 ,icon: SunIcon  },
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
