import axios from "axios";

export async function httpGet(url:string):Promise<any> {
    return (await axios.get(url)).data;
}

export async function httpPost(url:string, payload: string) {
    return (await axios.post(url, payload));
}
