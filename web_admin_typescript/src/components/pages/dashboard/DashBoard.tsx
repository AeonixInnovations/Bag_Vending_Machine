import React from "react";
import Layout from "../../layout/Layout";
import SmallCard from "../../shared/smallCard/SmallCard";
import LineChartComponent from "../../charts/lineChart/LineChart";
import DashboardTopStats from "../../shared/dashboardTopStats/DashboardTopStats";
import BarChart from "../../charts/barChart/BarChart";

const DashBoard = () => {
  return (
    <Layout>
      <div className=" hide_scroll">
        <DashboardTopStats />
        <div className="flex justify-between gap-10 px-5 my-10">
          <BarChart />
          <LineChartComponent />
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
