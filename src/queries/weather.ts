import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/weather"

interface GetWeatherDataParams {
    latitude: number;
    longitude: number;
    enabled?: boolean;
}

export function useGetWeatherData({latitude, longitude, enabled = true}: GetWeatherDataParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.weathers, latitude, longitude],
        queryFn: () => getAll({latitude, longitude}),
        retry: false,
        keepPreviousData: true,
        enabled: enabled,
    })
}