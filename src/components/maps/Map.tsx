"use client"

import {useState, useEffect, useRef, useCallback} from "react"
import {GoogleMap, useJsApiLoader, Marker, Circle} from "@react-google-maps/api"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Waves, AlertTriangle} from "lucide-react"
import SearchBar from "./SearchBar"
import PlacesList from "./PlacesList"
import FloodInfo from "./FloodInfo"
import axios from "axios"
import {useGetGeocode} from "@/queries/geocode";

const libraries = ["places"]
const mapCenter = {lat: 27.7172, lng: 85.3240}

const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{visibility: "off"}]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [{visibility: "off"}]
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [{visibility: "off"}]
    }
]

export default function Map() {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([])
    const [floodAreas, setFloodAreas] = useState<{ center: google.maps.LatLngLiteral, radius: number }[]>([])
    const [searchAddress, setSearchAddress] = useState("")

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: libraries as never
    })

    const {data: geocodeData} = useGetGeocode(searchAddress, !!searchAddress)

    const mapRef = useRef<google.maps.Map>()
    const placesServiceRef = useRef<google.maps.places.PlacesService>()

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
        setMap(map)
        placesServiceRef.current = new google.maps.places.PlacesService(map)
    }, [])

    const fetchPlaces = useCallback(() => {
        if (!placesServiceRef.current) return;

        const types = ['hospital', 'bus_station'];
        types.forEach(type => {
            const request = {
                location: mapCenter,
                radius: 5000,
                type: type
            };

            placesServiceRef.current!.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    setPlaces(prevPlaces => [...prevPlaces, ...results]);
                }
            });
        });
    }, []);

    const fetchFloodData = useCallback(async () => {
        try {
            const response = await axios.get('/api/floodData')
            setFloodAreas(response.data)
        } catch (error) {
            console.error('Error fetching flood data:', error)
        }
    }, [])

    useEffect(() => {
        if (map) {
            fetchPlaces()
            fetchFloodData()
        }
    }, [map, fetchPlaces, fetchFloodData])

    useEffect(() => {
        if (geocodeData && map) {
            const {lat, lng} = geocodeData.results[0].geometry.location
            map.panTo({lat, lng})
        }
    }, [geocodeData, map])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 relative">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100%'}}
                        center={mapCenter}
                        zoom={14}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            styles: mapStyles,
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
                        {floodAreas.map((area, index) => (
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
                ) : (
                    <div>Loading...</div>
                )}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Card className="w-80">
                        <SearchBar onSearch={setSearchAddress}/>
                        <PlacesList places={places}/>
                    </Card>
                    <div className="flex flex-col gap-2 items-end">
                        <div className="flex gap-2 w-[300px]">
                            <Button variant="outline" className="bg-background w-full" onClick={fetchFloodData}>
                                <Waves className="mr-2 h-4 w-4"/>
                                Update Flood Data
                            </Button>
                            <Button variant="destructive">
                                <AlertTriangle className="mr-2 h-4 w-4"/>
                                Report
                            </Button>
                        </div>
                        <FloodInfo floodAreas={floodAreas}/>
                    </div>
                </div>
            </div>
        </div>
    )
}