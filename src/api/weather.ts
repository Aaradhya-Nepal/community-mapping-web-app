import axios from 'axios'
import config from "@/config"

export const getAll = async ({lat, lon}: any) => {
    const url = `${config.OPEN_WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${config.OPEN_WEATHER_API_KEY}&units=metric`
    const response = await axios.get(url)
    return response.data;
}