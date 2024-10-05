"use client";

import {useEffect} from 'react';
import MapInterface2 from "@/components/maps/MapInterface2";

export default function Home() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const address = '1600 Amphitheatre Parkway, Mountain View, CA';

    const fetchGeocode = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching geocode data:', error);
        }
    };

    useEffect(() => {
        fetchGeocode();
    }, []);

    return (
        <>
            <MapInterface2/>
        </>
    );
}
