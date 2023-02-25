import axios from "axios";

export async function httpGet(url:string):Promise<any> {
    return (await axios.get(url)).data;
}
