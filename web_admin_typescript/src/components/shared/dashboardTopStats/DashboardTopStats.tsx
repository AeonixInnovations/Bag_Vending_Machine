import React from "react";
import SmallCard from "../smallCard/SmallCard";

const DashboardTopStats = () => {
  const rows = [
    [
      { title: "Total Machines", count: 163 },
      { title: "Bags Disband", count: 265 },
      { title: "xyz", count: 65 },
      { title: "total shell", count: 105 },
    ],
    [
      { title: "Total Bags Disband", count: 163 },
      { title: "Disbanded this week", count: 265 },
      { title: "This week", count: 105 },
      { title: "Today", count: 65 },
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
