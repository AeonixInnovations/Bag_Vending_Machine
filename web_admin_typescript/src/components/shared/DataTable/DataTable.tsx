import {
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
  Spinner,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import dayjs from "dayjs";

import { TABLE_HEAD, TABS } from "../../../constants/Tabs";
import { DeviceListPropsInterface } from "../../../@types/interface/props/DeviceListProps";
import EditCell from "./editCell/EditCell";
import { useState } from "react";
import { DeviceInterface } from "../../../@types/interface/deviceDetails/DeviceInterface";
import { getSingleDeviceData } from "../../../utils/apis/Apis";
import { useNavigate } from "react-router-dom";

const DataTable = ({
  deviceList,
  setDeviceList,
  handleRefresh,
  pageNumber,
  totalPages,
  handlePrevious,
  handleNext,
  handleSelect,
}: DeviceListPropsInterface) => {
  const navigate = useNavigate();
  // const getTime = (date: Date) => {
  //     const time = dayjs(date).format('h:mm:ss A');
  //     return time;
  // }
  // const routeToDeviceDetails = (device_id: string) => {
  //     const path = `/device/${device_id}`;
  //     navigate(path);
  // }
  //   const [updateButtonLoading, setUpdateButtonLoading] = useState<boolean>(false);
  // const [singleDeviceData, setSingleDeviceData] = useState<DeviceInterface[]>([]);

  const [loadingRows, setLoadingRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleUpdate = async (device_id: string) => {
    setLoadingRows((prevState) => ({ ...prevState, [device_id]: true }));
    try {
      const response = await getSingleDeviceData(device_id);
      console.log(response);
      if (response?.status === 200) {
        const updatedDevice = response.data.data[0];
        // setSingleDeviceData(updatedDevice);
        setDeviceList((prevState) => {
          return prevState.map((device) => {
            if (device.device_id === device_id) {
              return { ...device, ...updatedDevice };
            }
            return device;
          });
        });
      }
    } catch (error) {
      console.error("Error updating device:", error);
    } finally {
      setLoadingRows((prevState) => ({ ...prevState, [device_id]: false }));
    }
  };
  return (
    // <div className="px-10 my-10 mt-28">
    <div className="px-10  ">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="md:mb-5 flex flex-wrap items-center justify-between gap-8 text-left">
            <div>
              <Typography variant="h5" color="green" className="mx-2">
                All Vending Machine List
              </Typography>
              <Typography color="blue-gray" className="mt-1 mx-2 font-normal">
                See information about all devices
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="outlined"
                className="border-blue-500 text-indigo-500 inline-flex items-center"
                size="sm"
                onClick={handleRefresh}
              >
                {/* <ArrowPathIcon /> */}
                Refresh
              </Button>
              <Button
                variant="filled"
                className="border-blue-500  inline-flex items-center"
                size="sm"
                onClick={() => navigate("/refill-details")}
              >
                {/* <ArrowPathIcon /> */}
                Check Refill Count
              </Button>
            </div>
          </div>

          {/* <div className="flex flex-col items-center justify-between  gap-4 md:flex-row ">
                        <Tabs value="all" className="w-full md:w-max ">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                        </div>
                    </div> */}
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <Menu>
            <MenuHandler>
              <Button
                variant="outlined"
                size="sm"
                className="flex items-center gap-2 text-base font-normal capitalize tracking-normal mx-2"
              >
                Item per page
                <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 `} />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => handleSelect(10)}>10</MenuItem>
              <MenuItem onClick={() => handleSelect(25)}>25</MenuItem>
              <MenuItem onClick={() => handleSelect(50)}>50</MenuItem>
              <MenuItem onClick={() => handleSelect(100)}>100</MenuItem>
            </MenuList>
          </Menu>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className=" border-y border-blue-gray-100 bg-orange-50 p-4 "
                  >
                    <Typography
                      variant="small"
                      color="black"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {/* {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )} */}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deviceList.map(
                (
                  {
                    device_id,
                    address,
                    available_stocks,
                    max_stocks,
                    updatedAt,
                    date,
                  },
                  index
                ) => {
                  const isLast = index === deviceList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    // device id
                    <tr key={device_id}>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {device_id}
                          </Typography>
                        </div>
                      </td>
                      {/* Address */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {address}
                        </Typography>
                      </td>
                      {/* Available_stock */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {available_stocks}
                        </Typography>
                      </td>
                      {/* max stock */}

                      {/* <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    <EditCell device_id={device_id} data={max_stocks} handleRefresh={handleRefresh} />
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                 <div className="flex justify-left items-center ">
                                                     <Chip color="green" variant="ghost" value="Online" />
                                                </div>
                                                
                                            </td>
                                             */}
                      {/* Updated At */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {`${dayjs(updatedAt).format("DD-MM-YYYY")}, ${dayjs(
                            updatedAt
                          ).format("HH:mm:ss")}`}
                        </Typography>
                      </td>
                      {/* Action */}
                      <td className={`flex items-center ${classes}`}>
                        {/* <Button size="sm" color="blue-gray" onClick={handleUpdate}>Update</Button>
                                                {updateButtonLoading === true && <Spinner className="h-4 w-4 ml-2" />} */}
                        <Button
                          size="sm"
                          color="blue-gray"
                          onClick={() => handleUpdate(device_id)}
                        >
                          Update
                        </Button>
                        {loadingRows[device_id] ? (
                          <Spinner className="h-4 w-4 ml-2 " />
                        ) : (
                          <div className="h-4 w-4 ml-2 opacity-0"></div>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {`Page: ${pageNumber} / ${totalPages}`}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePrevious}
              disabled={pageNumber === 1}
            >
              Prev
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNext}
              disabled={pageNumber === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {/* <Modal open={open} handleOpen={handleOpen} child={<Calender/>}/> */}
    </div>
  );
};

export default DataTable;
