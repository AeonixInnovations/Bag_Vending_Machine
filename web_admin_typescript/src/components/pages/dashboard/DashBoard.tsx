import React from "react";
import Layout from "../../layout/Layout";
import SmallCard from "../../shared/smallCard/SmallCard";
import LineChartComponent from "../../charts/lineChart/LineChart";
import BagChartComponent from "../../charts/lineChart/bagsChart";
import MachineVSMarketChartComponent from "../../charts/lineChart/MachineVSMarket";
import BestMarketsChartComponent from "../../charts/lineChart/BestMarkets";
import BestMachinesChartComponent from "../../charts/lineChart/BestMachines";
import DashboardTopStats from "../../shared/dashboardTopStats/DashboardTopStats";
import BarChart from "../../charts/barChart/BarChart";

const DashBoard = () => {
  return (
    <Layout>
      <div className=" hide_scroll">
        <DashboardTopStats />
        <div className="flex justify-between gap-10 px-5 my-10">
          {/* <BarChart /> */}
          {/* <LineChartComponent title={"Machines vs Markets"} /> */}
          <MachineVSMarketChartComponent />
          <BagChartComponent />
        </div>
        <div className="flex justify-between gap-10 px-5 my-10">
          {/* <BarChart /> */}
          <BestMarketsChartComponent />
          <BestMachinesChartComponent />
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
