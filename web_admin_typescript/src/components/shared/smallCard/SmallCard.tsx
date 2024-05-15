import { Chip } from "@material-tailwind/react";
import React from "react";

const SmallCard = ({ title, count }: any) => {
  return (
    <a
      href="#"
      className="flex flex-row items-center p-4 gap-3 xl:w-56 2xl:w-64  transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow-md hover:shadow-xl "
    >
      <div className="flex items-center justify-center w-12 h-12 bg-green-100 border border-green-200 rounded-full shadow-inner ">
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
      </div>
      <div className="f">
        <h5 className="mb-3 text-lg font-medium text-gray-800">{title}</h5>
        <Chip variant="gradient" value={count}></Chip>
        {/* <Chip variant="ghost" value={count}></Chip> */}
      </div>
    </a>
  );
};

export default SmallCard;
