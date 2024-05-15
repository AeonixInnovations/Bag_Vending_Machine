import React from "react";
import Layout from "../../layout/Layout";
import SmallCard from "../../shared/smallCard/SmallCard";

const DashBoard = () => {
  return (
    <Layout>
      <div className="flex justify-between px-10 gap-5 mt-5">
        <SmallCard title={"Total Machines"} count={163} />
        <SmallCard title={"Total Machines"} count={265} />
        <SmallCard title={"Total Machines"} count={65} />
        <SmallCard title={"Total Machines"} count={105} />
      </div>
    </Layout>
  );
};

export default DashBoard;
