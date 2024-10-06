"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {Circle, GoogleMap, InfoWindow, Marker, useJsApiLoader} from "@react-google-maps/api";
import Loader from "@/components/loader/Loader";
import Header from "@/components/maps/Header";
import {libraries, mapProperties} from "@/components/maps/map-properties";
import {useGetFloodData} from "@/queries/flood";
import Image from "next/image";

const calculateFloodRisk = (floodData: any) => {
    return floodData.daily.time.map((date: string, index: number) => {
        const discharge = floodData.daily.river_discharge_seamless_v4[index];
        let riskLevel = "low";
        const radius = discharge * 100;

        if (discharge > 10) {
            riskLevel = "high";
        } else if (discharge > 5) {
            riskLevel = "medium";
        }

        return {
            date,
            discharge,
            riskLevel,
            center: {lat: floodData.latitude, lng: floodData.longitude},
            radius
        };
    });
};

const generateRandomCoordinates = (center: google.maps.LatLngLiteral, radius: number, count: number) => {
    const coordinates = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const latitude = center.lat + (distance * Math.cos(angle)) / 111000;
        const longitude = center.lng + (distance * Math.sin(angle)) / (111000 * Math.cos(center.lat * (Math.PI / 180)));
        coordinates.push({latitude, longitude});
    }
    return coordinates;
};

export default function Map() {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);

    const mapRef = useRef<google.maps.Map>();
    const placesServiceRef = useRef<google.maps.places.PlacesService>();

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: libraries as never
    });

    const {data: floodData} = useGetFloodData({coordinates: coordinates.slice(0, 5)});

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        setMap(map);
        placesServiceRef.current = new google.maps.places.PlacesService(map);
    }, []);

    const fetchVulnerablePlaces = useCallback(async () => {
        if (!placesServiceRef.current) return;

        const types = ['hospital', 'health', 'bus_station'];
        const vulnerablePlaces: { latitude: number; longitude: number }[] = [];

        for (const type of types) {
            const request = {
                location: userLocation,
                radius: 5000,
                type: type
            };

            const results = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
                placesServiceRef.current!.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        resolve(results);
                    } else {
                        reject(status);
                    }
                });
            });

            results.forEach(place => {
                if (place.geometry?.location) {
                    vulnerablePlaces.push({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    });
                }
            });
        }

        setCoordinates(vulnerablePlaces);
    }, [userLocation]);

    const fetchPlaces = useCallback(() => {
        if (!placesServiceRef.current || !userLocation) return;

        const types = ['hospital', 'health', 'bus_station'];
        types.forEach(type => {
            const request = {
                location: userLocation,
                radius: 5000,
                type: type
            };

            placesServiceRef.current!.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    setPlaces(prevPlaces => [...prevPlaces, ...results]);
                }
            });
        });
    }, [userLocation]);

    const handlePlaceClick = (place: google.maps.places.PlaceResult) => {
        setSelectedPlace(place);
        map?.panTo(place.geometry?.location!);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setUserLocation({lat: latitude, lng: longitude});
                },
                () => {
                    setUserLocation({lat: 27.7172, lng: 85.3240});
                }
            );
        } else {
            setUserLocation({lat: 27.7172, lng: 85.3240});
        }
    }, []);

    useEffect(() => {
        if (map && userLocation) {
            map.panTo(userLocation);
            fetchPlaces();
            fetchVulnerablePlaces();
            const randomCoordinates = generateRandomCoordinates(userLocation, 10000, 30);
            setCoordinates(randomCoordinates);
        }
    }, [map, userLocation, fetchPlaces, fetchVulnerablePlaces]);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return <Loader/>;
    }

    const riskAreas = floodData ? floodData.flatMap(calculateFloodRisk) : [];

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 relative">
                <GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={userLocation || {lat: 27.7172, lng: 85.3240}}
                    zoom={14}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        styles: mapProperties,
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                >
                    {places.map((place, index) => (
                        <Marker
                            key={index}
                            position={place.geometry?.location as google.maps.LatLng}
                            icon={{
                                url: place.types?.includes('hospital') ? '/hospital-icon.png' : '/bus-icon.png',
                                scaledSize: new google.maps.Size(30, 30)
                            }}
                        />
                    ))}
                    {riskAreas.map((area: any, index: number) => (
                        <Circle
                            key={index}
                            center={area.center}
                            radius={area.radius}
                            options={{
                                fillColor: area.riskLevel === "high" ? 'rgba(0, 255, 0, 0.35)' : area.riskLevel === "medium" ? 'rgba(255, 165, 0, 0.35)' : 'rgba(255, 0, 0, 0.35)',
                                fillOpacity: 0.35,
                                strokeColor: area.riskLevel === "high" ? 'rgba(0, 255, 0, 0.8)' : area.riskLevel === "medium" ? 'rgba(255, 165, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)',
                                strokeWeight: 1,
                            }}
                        />
                    ))}
                    {selectedPlace && selectedPlace.geometry?.location && (
                        <InfoWindow
                            position={selectedPlace.geometry.location as google.maps.LatLng}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div>
                                {selectedPlace.photos && selectedPlace.photos.length > 0 && (
                                    <Image
                                        width={120}
                                        height={20}
                                        src={selectedPlace.photos[0].getUrl({maxWidth: 200, maxHeight: 200})}
                                        alt={selectedPlace.name}
                                        className="mb-2"
                                    />
                                )}
                                <h2 className="text-lg font-semibold">{selectedPlace.name}</h2>
                                <p>{selectedPlace.vicinity}</p>
                                <p>{selectedPlace.formatted_address}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
                <Header places={places} userLocation={userLocation} onPlaceClick={handlePlaceClick}
                        riskAreas={riskAreas}/>
                <div className="absolute bottom-6 right-14 bg-white p-2 rounded shadow">
                    <h3 className="text-sm font-semibold">Risk Levels</h3>
                    <div className="flex items-center mt-2">
                        <div className="w-4 h-4 bg-red-500 mr-2"></div>
                        <span className="text-xs">High Risk</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="w-4 h-4 bg-orange-500 mr-2"></div>
                        <span className="text-xs">Medium Risk</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="w-4 h-4 bg-green-500 mr-2"></div>
                        <span className="text-xs">Low Risk</span>
                    </div>
                </div>
                <div
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded shadow text-xs">
                    &copy; Astro Nerds
                </div>
            </div>
        </div>
    );
}