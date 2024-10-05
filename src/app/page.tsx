"use client";
import MapInterface from "@/components/maps/MapInterface";
import {useGetGeocode} from "@/queries/geocode";

export default function Home() {
    const address = '1600 Amphitheatre Parkway, Mountain View, CA';
    const {data: geocodes} = useGetGeocode(address);
    console.log(geocodes)

    return (
        <>
            <MapInterface/>
        </>
    );
}
