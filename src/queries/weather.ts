import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/weather"

export function useGetWeatherData({lat, lon, enabled = true}: any) {
    return useQuery({
        queryKey: [QUERY_KEYS.weathers, lat, lon],
        queryFn: () => getAll({lat, lon}),
        retry: false,
        keepPreviousData: true,
        enabled: enabled,
    })
}