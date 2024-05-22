import React, { useContext } from "react";
import LoginTop from "../../loginTob/LoginTop";
import { Avatar } from "@material-tailwind/react";
import AuthContext from "../../../../contexts/authContext/authContext";

const SideProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex flex-col items-center mt-6 -mx-2">
        <div className="w-24 h-24 mx-2 flex items-center justify-center rounded-full bg-green-400">
          <h4 className="text-3xl text-gray-100 font-semibold">AF</h4>
        </div>
        <h4 className="mx-2 mt-2 font-medium text-gray-200">
          {user?.user_name || "John Bhai"}
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-400">
          {/* john@example.com */}
          {user?.email || "John Bhai"}
        </p>
      </div>
    </div>
  );
};

export default SideProfile;
