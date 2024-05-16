import React from "react";
import Layout from "../../layout/Layout";
import SmallCard from "../../shared/smallCard/SmallCard";
import LineChartComponent from "../../charts/lineChart/LineChart";
import DashboardTopStats from "../../shared/dashboardTopStats/DashboardTopStats";

const DashBoard = () => {
  return (
    <Layout>
      <DashboardTopStats />
      <div className="">{/* <LineChartComponent /> */}</div>
    </Layout>
  );
};

export default DashBoard;
