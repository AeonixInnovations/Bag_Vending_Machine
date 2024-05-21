import React from "react";
import SmallCard from "../smallCard/SmallCard";

const DashboardTopStats = () => {
  const rows = [
    [
      { title: "Total Machines", count: 163 },
      { title: "Total Markets", count: 265 },
      { title: "Out of order", count: 65 },
      { title: "total sell", count: 105 },
    ],
    [
      { title: "Total Bags Disband", count: 605 },
      { title: "Bag Dispense this month", count: 465 },
      { title: "Bag Dispense this week", count: 105 },
      { title: "Bag Dispense Today", count: 35 },
    ],
  ];

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-between px-10 gap-5 mt-5">
          {row.map((card, cardIndex) => (
            <SmallCard key={cardIndex} title={card.title} count={card.count} />
          ))}
        </div>
      ))}
    </>
  );
};

export default DashboardTopStats;
