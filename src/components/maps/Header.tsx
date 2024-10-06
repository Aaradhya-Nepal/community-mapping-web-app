"use client";

import React from 'react';
import {Card} from "@/components/ui/card";
import PlacesList from "@/components/maps/PlacesList";
import FloodInfo from "@/components/maps/FloodInfo";
import WeatherInfo from "@/components/maps/WeatherInfo";
import NewsPanel from "@/components/maps/NewsPanel";
import Recents from "@/components/maps/Recents";
import {useGetNews} from "@/queries/news";
import {useGetYoutubeVideos} from "@/queries/youtube";
import PlaceResult = google.maps.places.PlaceResult;

interface Location {
    lat: number;
    lng: number;
}

interface HeaderProps {
    places: PlaceResult[];
    userLocation: Location;
    onPlaceClick: (place: google.maps.places.PlaceResult) => void;
    riskAreas: {
        center: google.maps.LatLngLiteral;
        radius: number;
        date: string;
        discharge: number;
        riskLevel: string;
    }[];
}

const Header = ({
                    places,
                    userLocation,
                    onPlaceClick,
                    riskAreas
                }: HeaderProps) => {
    const {data: news} = useGetNews();
    const {data: youtube} = useGetYoutubeVideos();
    return (
        <>
            <Card className="w-80 absolute top-4 left-4">
                {places && (<PlacesList places={places} onPlaceClick={onPlaceClick}/>)}
                {news && (<NewsPanel newsData={news}/>)}
                {youtube && (<Recents recentData={youtube}/>)}
            </Card>
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                {riskAreas && riskAreas.length > 0 && (<FloodInfo floodAreas={riskAreas}/>)}
                {userLocation && (
                    <WeatherInfo latitude={userLocation.lat} longitude={userLocation.lng}/>
                )}
            </div>
        </>
    );
};

export default Header;