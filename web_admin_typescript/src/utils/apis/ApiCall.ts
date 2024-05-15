
import axios from "axios"
import { baseURL } from "../../configs/apiconfig";


export const Get = async (url: string, headers: Object) => {
    try {
        const response = await axios.get(baseURL + url, headers);
        return response;
    } catch (exception) {
        console.log(exception);
    }
}

export const Post = async (url: string, payload: Object, headers: Object) => {
    // eslint-disable-next-line no-useless-catch
    try {
        if (payload !== null || payload !== undefined) {
            const response = await axios.post(baseURL + url, payload, headers);
            return response;
        }
        throw "error";
    } catch (exception) {
        throw exception;
    }
}

export const Put = async (url: string, payload: Object, headers: Object) => {
    try {
        if (payload != null || payload != undefined) {
            const response = await axios.put(baseURL + url, payload, headers);
            return response;
        }
    } catch (exception) {
        console.log(exception);
    }
}

export const Patch = async (url: string, payload: Object, headers: Object) => {
    try {
        if (payload != null || payload != undefined) {
            const response = await axios.patch(baseURL + url, payload, headers);
            return response;
        }
    } catch (exception) {
        console.log(exception);
    }
}

export const Delete = async (url: string, headers: Object) => {
    try {
        const response = await axios.delete(baseURL + url, headers);
        return response;
    } catch (exception) {
        console.log(exception);
    }
}

