import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/flood"

export function useGetFloodData({latitude, longitude, enabled = true}: any) {
    return useQuery({
        queryKey: [QUERY_KEYS.floods, latitude, longitude],
        queryFn: () => getAll({latitude, longitude}),
        retry: false,
        keepPreviousData: true,
        refetchInterval: 60000,
        enabled: enabled,
    })
}