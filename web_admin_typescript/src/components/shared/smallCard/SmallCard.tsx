import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

// const SmallCard = ({ title, count, Icon }: any) => {
//   return (
//     <a
//       href="#"
//       className="flex flex-column items-center p-4 gap-3 w-96 2xl:w-72  transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow-md hover:shadow-xl"
//     >
//       <div className="flex items-center  justify-center w-12 h-12 bg-green-100 border border-green-200 rounded-full shadow-inner ">
//         {/* <ShoppingBagIcon className="h-6 w-6 text-green-500" /> */}
//         <Icon className="h-6 w-6 text-green-500" />
//       </div>
//       <div className="f ">
//         <h5 className="mb-3 text-md text-start font-medium text-gray-800">
//           {title}
//         </h5>
//         <Chip
//           variant="gradient"
//           className="test-sm md:text-base p-0 font-medium w-32"
//           value={count}
//         />
//         {/* <Chip
//           variant="gradient"
//           value={count}
//         /> */}
//         {/* <Chip variant="ghost" value={count}></Chip> */}
//       </div>
//     </a>
//   );
// };

const SmallCard = ({ title, count, Icon, color }: any) => {
  return (
    <div
      className={`w-64 p-5 transition-all duration-500  border border-indigo-100 rounded-lg shadow-md hover:shadow-xl ${color}`}
    >
      <div className="text-left flex flex-col">
        <div className="flex flex-nowrap justify-between items-center w-full mb-3">
          <div
            className={` flex justify-center items-center border border-black/10 bg-black/10 rounded-full w-10 h-10`}
          >
            <Icon className={`h-6 w-6 stroke-black/30`} />
          </div>
          <p className="text-white/90 text-3xl  font-bold">{count}</p>
        </div>
        <p className="text-black/50 font-bold">{title}</p>
      </div>
    </div>
  );
};

export default SmallCard;
