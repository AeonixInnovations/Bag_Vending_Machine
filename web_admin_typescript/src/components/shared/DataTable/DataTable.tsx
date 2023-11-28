import {
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
} from "@material-tailwind/react";
import dayjs from "dayjs";

import { TABLE_HEAD, TABS } from "../../../constants/Tabs";
import { DeviceListPropsInterface } from "../../../@types/interface/props/DeviceListProps";
import EditCell from "./editCell/EditCell";

const DataTable = ({ deviceList, handleRefresh }: DeviceListPropsInterface) => {
    // const navigate = useNavigate();
    // const getTime = (date: Date) => {
    //     const time = dayjs(date).format('h:mm:ss A');
    //     return time;
    // }
    // const routeToDeviceDetails = (device_id: string) => {
    //     const path = `/device/${device_id}`;
    //     navigate(path);
    // }
    return (
        <div className="px-10 my-10 mt-28">

            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="indigo">
                                Device list
                            </Typography>
                            <Typography className="mt-1 font-normal text-indigo-700">
                                See information about all devices
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button variant="outlined" className="border-blue-500 text-indigo-500 inline-flex items-center" size="sm" onClick={handleRefresh}>
                                {/* <ArrowPathIcon /> */}
                                Refresh
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between  gap-4 md:flex-row">
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
                            {/* <Input className=""/> */}
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-orange-50 p-4 transition-colors hover:bg-white "
                                    >
                                        <Typography
                                            variant="small"
                                            color="black"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{" "}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {deviceList.map(
                                ({ device_id, available_stocks, max_stocks, last_update, date }, index) => {
                                    const isLast = index === deviceList.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
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
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {available_stocks}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    <EditCell device_id={device_id} data={max_stocks} handleRefresh={handleRefresh} />
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            {/* <Modal open={open} handleOpen={handleOpen} child={<Calender/>}/> */}
        </div>
    );
}

export default DataTable;