"use client";

import {useCallback, useEffect, useRef, useState} from "react"
import {Circle, GoogleMap, InfoWindow, Marker, useJsApiLoader} from "@react-google-maps/api"
import {useGetGeocode} from "@/queries/geocode"
import Loader from "@/components/loader/Loader"
import Header from "@/components/maps/Header"
import {libraries, mapProperties} from "@/components/maps/map-properties";
import {useGetFloodData} from "@/queries/flood";
import Image from "next/image";

const calculateFloodRisk = (floodData: any) => {
    return floodData.daily.time.map((date: string, index: number) => {
        const discharge = floodData.daily.river_discharge_seamless_v4[index];
        let riskLevel = "low";

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
            radius: discharge * 100
        };
    });
};

export default function Map() {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([])
    const [searchAddress, setSearchAddress] = useState("")
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)
    const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

    const mapRef = useRef<google.maps.Map>()
    const placesServiceRef = useRef<google.maps.places.PlacesService>()

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: libraries as never
    })

    const {data: geocodeData} = useGetGeocode(searchAddress, !!searchAddress)
    const {data: floodData} = useGetFloodData({
        latitude: userLocation?.lat ?? '27.7172',
        longitude: userLocation?.lng ?? '85.3240'
    })

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
        setMap(map)
        placesServiceRef.current = new google.maps.places.PlacesService(map)
    }, [])

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
        }
    }, [map, userLocation, fetchPlaces]);

    useEffect(() => {
        if (geocodeData && map) {
            const {lat, lng} = geocodeData.results[0].geometry.location
            map.panTo({lat, lng})
        }
    }, [geocodeData, map])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    if (!isLoaded) {
        return <Loader/>
    }

    const riskAreas = floodData && floodData ? calculateFloodRisk(floodData) : [];

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
                                fillColor: area.riskLevel === "high" ? 'rgba(255, 0, 0, 0.35)' : area.riskLevel === "medium" ? 'rgba(255, 165, 0, 0.35)' : 'rgba(0, 255, 0, 0.35)',
                                fillOpacity: 0.35,
                                strokeColor: area.riskLevel === "high" ? 'rgba(255, 0, 0, 0.8)' : area.riskLevel === "medium" ? 'rgba(255, 165, 0, 0.8)' : 'rgba(0, 255, 0, 0.8)',
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
                <Header setSearchAddress={setSearchAddress} places={places} refetchFloodData={() => {
                }} userLocation={userLocation} onPlaceClick={handlePlaceClick}/>
            </div>
        </div>
    )
}