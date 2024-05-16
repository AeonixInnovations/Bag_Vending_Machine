import React, { useState } from "react";
import SideProfile from "./sideProfile/SideProfile";
import {
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`w-80 absolute sm:relative bg-gray-900 shadow md:h-full flex-col justify-between `}
      >
        <div className="px-8 pt-5 mb-10">
          <SideProfile />
        </div>
        <List>
          <Link to="/dashbaord">
            <ListItem className="text-gray-100 ">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <Link to="/home">
            <ListItem className="text-gray-100">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Update
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="gradient"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </Link>
          <ListItem className="text-gray-100">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem className="text-gray-100">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default SideBar;
