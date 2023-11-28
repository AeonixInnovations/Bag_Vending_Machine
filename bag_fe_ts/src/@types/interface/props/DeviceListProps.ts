import { DeviceInterface } from "../deviceDetails/DeviceInterface";

export interface DeviceListPropsInterface{
    deviceList:DeviceInterface[],
    handleRefresh:()=>void
}