import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/flood"

export function useGetFloodData(enabled = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.floods],
        queryFn: () => getAll(),
        retry: false,
        keepPreviousData: true,
        refetchInterval: 60000,
        enabled: enabled,
    })
}