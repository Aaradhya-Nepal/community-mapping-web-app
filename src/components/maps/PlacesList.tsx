import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin } from "lucide-react";
import SearchBar from "@/components/maps/SearchBar";
import React, { useState } from "react";

interface PlacesListProps {
    places: google.maps.places.PlaceResult[];
    onPlaceClick: (place: google.maps.places.PlaceResult) => void;
}

export default function PlacesList({ places, onPlaceClick }: PlacesListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const filteredPlaces = places.filter(place =>
        place.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <SearchBar onSearch={(query: string) => setSearchQuery(query)} />
            <CardContent>
                <h3 className="font-semibold mb-2">Places</h3>
                <ScrollArea className="h-[200px]">
                    {filteredPlaces.map((place, index) => (
                        <div
                            key={index}
                            className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 py-1 rounded-md"
                            onClick={() => onPlaceClick(place)}
                        >
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{place.name}</span>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </>
    );
}