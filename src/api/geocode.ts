import axios from 'axios'
import config from "@/config"

export const getAll = async (address: string) => {
    const url = `${config.GOOGLE_API_URL}/geocode/json?address=${encodeURIComponent(address)}&key=${config.GOOGLE_API_KEY}`
    const response = await axios.get(url)
    return response.data
}