import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/flood"

export function useGetFloodData({coordinates, enabled = true}: {
    coordinates: { latitude: number; longitude: number }[],
    enabled?: boolean
}) {
    return useQuery({
        queryKey: [QUERY_KEYS.floods, coordinates],
        queryFn: () => getAll(coordinates),
        retry: false,
        keepPreviousData: true,
        refetchInterval: 60000,
        enabled: enabled,
    });
}