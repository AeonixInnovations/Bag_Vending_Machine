import { DeviceInterface } from "../deviceDetails/DeviceInterface";

export interface DeviceListPropsInterface{
    deviceList:DeviceInterface[],
    setDeviceList: React.Dispatch<React.SetStateAction<DeviceInterface[]>>,
    handleRefresh:()=>void,
}