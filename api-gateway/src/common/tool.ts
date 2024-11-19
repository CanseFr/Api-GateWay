import {urlsWithPorts} from "./const";
import axios from "axios";

export const getUrlWithPort = (req: string) => {
    return urlsWithPorts.find((u) => req.startsWith(u.url));
}

export const getValidateToken = async (authHeader: string) => {
    return await axios.post('http://localhost:3001/auth/validate-token', {}, {
        headers: { 'Authorization': authHeader },
    });
};