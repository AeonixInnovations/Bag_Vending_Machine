import { header } from "../../configs/apiconfig";
import { Get, Post, Put } from "./ApiCall";

export const getAllDeviceList = async (pageNumber: number, perPageItem: number) => {
    const response = await Get(`/getAllDeviceList?page=${pageNumber}&perPageItem=${perPageItem}`,header);
    return response;
}

export const updateDeviceMaxStock = async (payload:{device_id:string,max_stocks:number}) => {
    const response = await Put("/updateMaxStock",payload,header);
    return response;
}

export const loginAdmin = async (payload:any) => {
    const response = await Post("/loginAdmin",payload,header);
    return response;
}

export const getSingleDeviceData = async (device_id: string)=>{
    //api calls
    const payload = {device_id: device_id};
    const response = await Post("/fetchSingleDeviceData",payload,header);
    return response;
}
// export const getCountByDate =async (device_id:string,date:string) => {
//     const response = await Get(`/getCountByDate/${device_id}/${date}`,header);
//     return response;
// }

export const postRefillStockData = async (deviceId: string, refillCount: number, date: string)=>{
    const payload = {
        device_id: deviceId,
        refillCount: refillCount,
        date: date
    }
    console.log(date)
    const response = await Post("/postRefillCount", payload, header);
    return response;
}

export const postRegisterMachine = async (deviceId: string, address: string, date: string, machine_contact_number: string)=>{
    const payload = {
        device_id: deviceId,
        address: address,
        date: date,
        machine_contact_number: machine_contact_number
    }
    const response = await Post("/registerNewDevice", payload, header);
    return response;
}

export const getRefillDetails = async (deviceId: string, startDate: string, endDate: string)=>{
    const response = await Get(`/getRefillStockDetails?deviceId=${deviceId}&startDate=${startDate}&endDate=${endDate}`, header);
    return response;
}
export const getTotalSell = async ()=>{
    const response = await Get(`/getALlStocks`, header);
    return response;
}
export const getRegisterDevice = async ()=>{
    const response = await Get(`/getAllDevices`, header);
    return response;
}
export const getSellDetails = async ()=>{
    const response = await Get(`/getSales`, header);
    return response;
}
export const getDeviceDetails = async ()=>{
    const response = await Get(`/getDevices`, header);
    return response;
}
export const getSalesbyWeek = async ()=>{
    const response = await Get(`/getSalesbyWeek`, header);
    return response;
}