import React from "react";
import SideBar from "../shared/sidebar/SIdeBar";
import Appbar from "../shared/appbar/Appbar";
import BreadCrumbs from "../shared/breadCrumbs/BreadCrumbs";

const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen w-full ">
      <SideBar />
      <div className="w-full h-screen overflow-y-scroll">
        <Appbar />
        <BreadCrumbs />
        {children}
      </div>
    </div>
  );
};

export default Layout;
