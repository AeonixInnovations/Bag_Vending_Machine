import React from "react";
import { RefillDetailsPropsInterface } from "../../@types/interface/props/RefillDetails";
import dayjs from "dayjs";

const RefillDetailsTable = ({refillDetails}:any)=>{

    const TABLE_HEAD = ["Date", "Device ID", "Refill Count"];
    return (    
        <table className="mt-4 w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="border-y border-blue-gray-100 bg-orange-50 p-4">
              <div className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                {head}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {refillDetails.map(({ date, device_id, refillCount }:any, index:number) => {
          const isLast = index === refillDetails.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={device_id}>
              {/* Date */}
              <td className={classes}>
                <div className="flex flex-col">
                  <div className="font-normal">
                    {dayjs(date).format("DD/MM/YYYY")}
                  </div>
                </div>
              </td>
              {/* Device ID */}
              <td className={classes}>
                <div className="font-normal">
                  {device_id}
                </div>
              </td>
              {/* Refill Count */}
              <td className={classes}>
                <div className="font-normal">
                  {refillCount}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    );
}

export default RefillDetailsTable;