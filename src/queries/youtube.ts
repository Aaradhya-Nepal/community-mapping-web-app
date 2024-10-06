import {useQuery} from "react-query"
import QUERY_KEYS from "@/constants/queryKeys"
import {getAll} from "@/api/youtube"

export function useGetYoutubeVideos(enabled = true) {
    return useQuery({
        queryKey: [QUERY_KEYS.youtube],
        queryFn: () => getAll(),
        retry: false,
        keepPreviousData: true,
        enabled: enabled,
    });
}