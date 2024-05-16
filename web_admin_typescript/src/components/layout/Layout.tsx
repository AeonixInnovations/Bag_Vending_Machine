import React from "react";
import { useLocation } from "react-router-dom";
import Appbar from "../shared/appbar/Appbar";
import BreadCrumbs from "../shared/breadCrumbs/BreadCrumbs";
import SideBar from "../shared/sidebar/SIdeBar";

const Layout = ({ children }: any) => {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbText = pathname.substring(pathname.lastIndexOf("/") + 1);

  const breadcrumbItems = [
    {
      text: breadcrumbText.charAt(0).toUpperCase() + breadcrumbText.slice(1),
      href: pathname,
      active: true,
    },
  ];

  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <div className="w-full h-screen overflow-y-scroll hide_scroll">
        <Appbar />
        <BreadCrumbs items={breadcrumbItems} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
