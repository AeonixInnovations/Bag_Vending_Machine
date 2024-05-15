import React from "react";
import LoginTop from "../../loginTob/LoginTop";
import { Avatar } from "@material-tailwind/react";

const SideProfile = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-6 -mx-2">
        <div className="w-24 h-24 mx-2 flex items-center justify-center rounded-full bg-green-400">
          <h4 className="text-3xl text-gray-100 font-semibold">JD</h4>
        </div>
        <h4 className="mx-2 mt-2 font-medium text-gray-200">John Doe</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-400">
          john@example.com
        </p>
      </div>
    </div>
  );
};

export default SideProfile;
