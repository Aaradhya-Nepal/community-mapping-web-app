import config from "@/config";
import axios from "axios";

export const getAll = async (coordinates: { latitude: number; longitude: number }[]) => {
    const requests = coordinates.map(({latitude, longitude}) => {
        const url = `${config.OPEN_METEO_FLOOD_API_URL}?latitude=${latitude}&longitude=${longitude}&daily=river_discharge,river_discharge_mean,river_discharge_median,river_discharge_max,river_discharge_min,river_discharge_p25,river_discharge_p75&models=seamless_v4,forecast_v4,consolidated_v4,seamless_v3,forecast_v3,consolidated_v3`;
        return axios.get(url);
    });

    const responses = await Promise.all(requests);
    return responses.map(response => response.data);
};