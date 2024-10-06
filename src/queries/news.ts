import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/news"

export function useGetNews(enabled = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.news],
        queryFn: () => getAll(),
        retry: false,
        keepPreviousData: true,
        enabled: enabled,
    });
}