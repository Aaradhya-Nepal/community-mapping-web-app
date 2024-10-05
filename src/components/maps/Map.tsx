"use client";

import {useCallback, useEffect, useRef, useState} from "react"
import {Circle, GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api"
import {useGetGeocode} from "@/queries/geocode"
import {useGetFloodData} from "@/queries/flood"
import Loader from "@/components/loader/Loader"
import Header from "@/components/maps/Header"
import {libraries, mapProperties} from "@/components/maps/map-properties";

export default function Map() {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([])
    const [searchAddress, setSearchAddress] = useState("")
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)

    const mapRef = useRef<google.maps.Map>()
    const placesServiceRef = useRef<google.maps.places.PlacesService>()

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: libraries as never
    })

    const {data: geocodeData} = useGetGeocode(searchAddress, !!searchAddress)
    const {data: floodData, refetch: refetchFloodData} = useGetFloodData()

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
                    {floodData && floodData.map((area: any, index: number) => (
                        <Circle
                            key={index}
                            center={area.center}
                            radius={area.radius}
                            options={{
                                fillColor: 'rgba(255, 0, 0, 0.35)',
                                fillOpacity: 0.35,
                                strokeColor: 'rgba(255, 0, 0, 0.8)',
                                strokeWeight: 1,
                            }}
                        />
                    ))}
                </GoogleMap>
                <Header setSearchAddress={setSearchAddress} places={places} refetchFloodData={refetchFloodData}
                        userLocation={userLocation}/>
            </div>
        </div>
    )
}