"use client";

import React from 'react';
import {Card} from "@/components/ui/card";
import PlacesList from "@/components/maps/PlacesList";
import {Button} from "@/components/ui/button";
import {AlertTriangle} from "lucide-react";
import FloodInfo from "@/components/maps/FloodInfo";
import WeatherInfo from "@/components/maps/WeatherInfo";
import NewsPanel from "@/components/maps/NewsPanel";
import Recents from "@/components/maps/Recents";

const Header = ({
                    places,
                    userLocation,
                    onPlaceClick,
                    news,
                    recent,
                    riskAreas
                }: any) => {
    return (
        <>
            <Card className="w-80 absolute top-4 left-4">
                {places && (<PlacesList places={places} onPlaceClick={onPlaceClick}/>)}
                {news && (<NewsPanel newsData={news}/>)}
                {recent && (<Recents recentData={recent}/>)}
            </Card>
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                <Button variant="destructive">
                    <AlertTriangle className="mr-2 h-4 w-4"/>
                    Report
                </Button>
                {riskAreas && riskAreas.length > 0 && (<FloodInfo floodAreas={riskAreas}/>)}
                {userLocation && (
                    <WeatherInfo latitude={userLocation.lat} longitude={userLocation.lng}/>
                )}
            </div>
        </>
    );
};

export default Header;