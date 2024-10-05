"use client";

import React, {useState} from 'react';
import {Card} from "@/components/ui/card";
import SearchBar from "@/components/maps/SearchBar";
import PlacesList from "@/components/maps/PlacesList";
import {Button} from "@/components/ui/button";
import {AlertTriangle, Waves} from "lucide-react";
import FloodInfo from "@/components/maps/FloodInfo";
import WeatherInfo from "@/components/maps/WeatherInfo";

const Header = ({setSearchAddress, places, refetchFloodData, userLocation}: any) => {
    const [floodAreas] = useState<{ center: google.maps.LatLngLiteral, radius: number }[]>([])
    return (
        <>
            <Card className="w-80 absolute top-4 left-4">
                <SearchBar onSearch={setSearchAddress}/>
                {places && (<PlacesList places={places}/>)}
            </Card>
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                <div className="flex gap-2 w-[300px]">
                    <Button variant="outline" className="bg-background w-full"
                            onClick={() => refetchFloodData()}>
                        <Waves className="mr-2 h-4 w-4"/>
                        Update Flood Data
                    </Button>
                    <Button variant="destructive">
                        <AlertTriangle className="mr-2 h-4 w-4"/>
                        Report
                    </Button>
                </div>
                {floodAreas && floodAreas.length > 0 && (<FloodInfo floodAreas={floodAreas}/>)}
                {userLocation && (
                    <WeatherInfo latitude={userLocation.lat} longitude={userLocation.lng}/>
                )}
            </div>
        </>
    );
};

export default Header;