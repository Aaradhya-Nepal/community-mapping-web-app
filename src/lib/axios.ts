import axios from "axios";
import config from "@/config";

const instance = axios.create({
    baseURL: config.GOOGLE_API_URL,
    timeout: 3000,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
    }
});

export default instance;
