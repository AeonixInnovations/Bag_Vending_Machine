import { header } from "../../configs/apiconfig";
import { Get, Put } from "./ApiCall";

export const getAllDeviceList = async () => {
    const response = await Get("/getAllDeviceList",header);
    return response;
}

export const updateDeviceMaxStock = async (payload:{device_id:string,max_stocks:number}) => {
    const response = await Put("/updateMaxStock",payload,header);
    return response;
}
// export const getCountByDate =async (device_id:string,date:string) => {
//     const response = await Get(`/getCountByDate/${device_id}/${date}`,header);
//     return response;
// }
