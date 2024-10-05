import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/geocode"

export function useGetGeocode(address: string, enabled = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.geocodes, address],
        queryFn: () => getAll(address),
        retry: false,
        keepPreviousData: true,
        enabled: enabled,
    })
}