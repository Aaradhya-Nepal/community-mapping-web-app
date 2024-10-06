import config from "@/config"
import axios from "axios";

export const getAll = async ({ latitude, longitude }: any) => {
    const url = `${config.OPEN_METEO_API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,rain,relative_humidity_2m,wind_speed_10m,cloudcover`;
    const response = await axios.get(url);
    return response.data;
};