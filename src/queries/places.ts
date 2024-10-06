import {useQuery} from "react-query";
import QUERY_KEYS from "@/constants/queryKeys";
import {getAll} from "@/api/places";

interface GetPlacesParams {
    location: google.maps.LatLngLiteral;
    radius: number;
    type: string[];
    apiKey: string;
    enabled?: boolean;
}

export function useGetPlaces({location, radius, type, apiKey, enabled = true}: GetPlacesParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.places, location, radius, type, apiKey],
        queryFn: () => getAll(location, radius, type, apiKey),
        retry: false,
        keepPreviousData: true,
        enabled: enabled,
    });
}