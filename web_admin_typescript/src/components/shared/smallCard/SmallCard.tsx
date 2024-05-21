import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Chip } from "@material-tailwind/react";
import React from "react";

const SmallCard = ({ title, count ,Icon}: any) => {
  return (
    <a
      href="#"
      className="flex flex-row items-center p-4 gap-3 w-96 2xl:w-72  transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow-md hover:shadow-xl "
    >
      <div className="flex items-center justify-center w-12 h-12 bg-green-100 border border-green-200 rounded-full shadow-inner ">
      {/* <ShoppingBagIcon className="h-6 w-6 text-green-500" /> */}
      <Icon className="h-6 w-6 text-green-500" />
      </div>
      <div className="f">
        <h5 className="mb-3 text-md text-start font-medium text-gray-800">
          {title}
        </h5>
        <Chip
          variant="gradient"
          className="test-sm md:text-base p-0 font-medium w-32"
          value={count}
        />
        {/* <Chip
          variant="gradient"
          value={count}
        /> */}
        {/* <Chip variant="ghost" value={count}></Chip> */}
      </div>
    </a>
  );
};

export default SmallCard;
