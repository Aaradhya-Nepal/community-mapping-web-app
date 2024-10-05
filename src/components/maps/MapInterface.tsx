"use client"

import {useState, useEffect, useRef, useCallback} from "react"
import {GoogleMap, useJsApiLoader, Marker, Circle} from "@react-google-maps/api"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Search, Waves, AlertTriangle, MapPin} from "lucide-react"

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

export default function MapInterface() {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: libraries as any
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([])
    const [floodAreas, setFloodAreas] = useState<{ center: google.maps.LatLngLiteral, radius: number }[]>([])

    const mapRef = useRef<google.maps.Map>()
    const placesServiceRef = useRef<google.maps.places.PlacesService>()

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
        setMap(map)
        placesServiceRef.current = new google.maps.places.PlacesService(map)
    }, [])

    const fetchPlaces = useCallback(() => {
        if (!placesServiceRef.current) return

        const request = {
            location: mapCenter,
            radius: 5000,
            type: ['hospital', 'bus_station']
        }

        placesServiceRef.current.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                setPlaces(results)
            }
        })
    }, [])

    const fetchFloodData = useCallback(() => {
        const simulatedFloodAreas = [
            {center: {lat: 27.7172, lng: 85.3240}, radius: 1000},
            {center: {lat: 27.7272, lng: 85.3340}, radius: 800},
        ]
        setFloodAreas(simulatedFloodAreas)
    }, [])

    useEffect(() => {
        if (map) {
            fetchPlaces()
            fetchFloodData()
        }
    }, [map, fetchPlaces, fetchFloodData])

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
                        <CardHeader>
                            <CardTitle>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input placeholder="Search Location" className="pl-8"/>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">Recent</h3>
                            <ScrollArea className="h-[200px]">
                                <p className="text-sm text-muted-foreground">No recent searches</p>
                            </ScrollArea>
                            <h3 className="font-semibold mt-4 mb-2">Web Result</h3>
                            <ScrollArea className="h-[200px]">
                                <p className="text-sm text-muted-foreground">No web results</p>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <div className="flex flex-col gap-2 items-end">
                        <div className="flex gap-2">
                            <Button variant="outline" className="bg-background" onClick={fetchFloodData}>
                                <Waves className="mr-2 h-4 w-4"/>
                                Update Flood Data
                            </Button>
                            <Button variant="destructive">
                                <AlertTriangle className="mr-2 h-4 w-4"/>
                                Report
                            </Button>
                        </div>
                        <CardContent className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Places</h3>
                            <ScrollArea className="h-[200px] w-[250px]">
                                {places.map((place, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <MapPin className="mr-2 h-4 w-4"/>
                                        <span>{place.name}</span>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </div>
                </div>
                <Card className="absolute bottom-4 left-4 w-80">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <span className="mr-2">Flood Information</span>
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">High Risk</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {floodAreas.length} flood-affected areas detected. Exercise caution and follow local
                            authorities&apos; instructions.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}