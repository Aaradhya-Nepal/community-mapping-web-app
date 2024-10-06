import config from "@/config"
import axios from "axios";

export const getAll = async () => {
    const url = `https://newsapi.org/v2/everything?q=Nepal floods&apiKey=${config.NEWS_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
};