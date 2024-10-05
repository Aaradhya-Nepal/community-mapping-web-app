import axios from "@/lib/axios";

export const getAll = async () => {
    const response = await axios.get('/api/floodData')
    return response.data
}