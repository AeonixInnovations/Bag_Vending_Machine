import React, { useState } from "react";
import Layout from "../../layout/Layout";
import {
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
  Button,
  CardFooter
} from "@material-tailwind/react";
import {  DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {  RefillStockSearchFormInterface } from "../../../@types/interface/refillStock/RefillStockSearchFormInterface";
import { format } from "date-fns";
import RefillDetailsTable from "../../refillDetailsTable/RefillDetailsTable";
import { getRefillDetails } from "../../../utils/apis/Apis";

const ViewRefillDetails = () => {
  const [formData, setFormData] = useState<RefillStockSearchFormInterface | null>({
    deviceId: "",
  });
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  const [refillDetails, setRefillDetails] = React.useState<any>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleOnSearch = async () => {
    const formattedStartDate = startDate ? format(startDate, "dd/MM/yyyy") : "";
    const formattedEndDate = endDate ? format(endDate, "dd/MM/yyyy") : "";
    const {deviceId}:any = formData;
    try {
        const response = await getRefillDetails(deviceId, formattedStartDate, formattedEndDate);
        
        setRefillDetails(response?.data.result);
    } catch (error) {
        
    }
  };

  return (
    <Layout>
      {/* <div className="">
          {isSave === 1 ? (
            <Alert className="rounded-none" color="green">Data Save Successfully</Alert>
          ) : isSave === 2 ? (
            <Alert className="rounded-none" color="red">Data not saved! Something went wrong</Alert>
          ) : null}
          
        </div> */}
      <Card color="transparent" shadow={false} className="h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none text-left mb-5"
        >
          <Typography variant="h5" color="indigo" className="mx-2">
            Vending Machine Stock Refill Details
          </Typography>
          <Typography color="blue-gray" className="mt-1 mx-2 font-normal">
            Date wise refill details
          </Typography>
        </CardHeader>
        <CardBody className="border text-left">
          <div className=" mb-2">
            <div className="grid grid-cols-3  gap-6">
              <div className="mb-1 flex-column  gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-3 text-left"
                >
                  Device ID*
                </Typography>
                <input
                  name="deviceId"
                  type="text"
                  value={formData?.deviceId}
                  onChange={handleInputChange}
                  required
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                  placeholder="Please enter valid Device ID"
                />
              </div>
              <div className="mb-1 flex-column  gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-3 text-left"
                >
                  Start Date*
                </Typography>
                <div>
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <input
                        onChange={() => null}
                        value={startDate ? format(startDate, "dd/MM/yyyy") : ""}
                        className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                        placeholder="Please select date"
                        name="date"
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                          caption:
                            "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium text-gray-900",
                          nav: "flex items-center",
                          nav_button:
                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal",
                          day_range_end: "day-range-end",
                          day_selected:
                            "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                          day_today: "rounded-md bg-gray-200 text-gray-900",
                          day_outside:
                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                        components={{
                          IconLeft: ({ ...props }) => (
                            <ChevronLeftIcon
                              {...props}
                              className="h-4 w-4 stroke-2"
                            />
                          ),
                          IconRight: ({ ...props }) => (
                            <ChevronRightIcon
                              {...props}
                              className="h-4 w-4 stroke-2"
                            />
                          ),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mb-1 flex-column  gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-3 text-left"
                >
                  End Date*
                </Typography>
                <div>
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <input
                        onChange={() => null}
                        value={endDate ? format(endDate, "dd/MM/yyyy") : ""}
                        className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                        placeholder="Please select date"
                        name="date"
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                          caption:
                            "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium text-gray-900",
                          nav: "flex items-center",
                          nav_button:
                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal",
                          day_range_end: "day-range-end",
                          day_selected:
                            "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                          day_today: "rounded-md bg-gray-200 text-gray-900",
                          day_outside:
                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                        components={{
                          IconLeft: ({ ...props }) => (
                            <ChevronLeftIcon
                              {...props}
                              className="h-4 w-4 stroke-2"
                            />
                          ),
                          IconRight: ({ ...props }) => (
                            <ChevronRightIcon
                              {...props}
                              className="h-4 w-4 stroke-2"
                            />
                          ),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <Button
              className="text-center md:text-left mt-6 md:mt-3 w-full md:w-auto "
              onClick={handleOnSearch}
              disabled={
                formData?.deviceId && startDate && endDate ? false : true
              }
            >
              Search
            </Button>
          </div>
        </CardBody>
        
              <RefillDetailsTable refillDetails={refillDetails}/>
      </Card>
    </Layout>
  );
};

export default ViewRefillDetails;
