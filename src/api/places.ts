import axios from "@/lib/axios";

export const getAll = async (location: google.maps.LatLngLiteral, radius: number, type: string[], apiKey: string) => {
    const params = {
        location: `${location.lat},${location.lng}`,
        radius,
        type: type.join('|'),
        key: apiKey,
    };

    const {data} = await axios.get('/place/nearbysearch/json', {params});
    return data.results;
};