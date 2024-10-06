import axios from "axios";
import config from "@/config";

export const getAll = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search`;

    const response = await axios.get(url, {
        params: {
            part: 'snippet',
            q: 'Nepal floods',
            maxResults: 5,
            type: 'video',
            key: config.YOUTUBE_API_KEY,
        }
    });

    return response.data;
};