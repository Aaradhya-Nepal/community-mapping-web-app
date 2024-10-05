"use client"

import {useState} from "react"
import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Search, Waves, AlertTriangle} from "lucide-react"

const center = {lat: 27.7172, lng: 85.3240}

export default function MapInterface() {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
    })

    const [map, setMap] = useState(null)

    const onLoad = (map: any) => {
        setMap(map)
    }

    const onUnmount = () => {
        setMap(null)
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 relative">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100%'}}
                        center={center}
                        zoom={14}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <Marker position={center}/>
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
                            <h3 className="font-semibold mb-2">Recents</h3>
                            <ScrollArea className="h-[200px]">
                                <p className="text-sm text-muted-foreground">No recent searches</p>
                            </ScrollArea>
                            <h3 className="font-semibold mt-4 mb-2">Web Results</h3>
                            <ScrollArea className="h-[200px]">
                                <p className="text-sm text-muted-foreground">No web results</p>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <div className="flex gap-2">
                        <Button variant="outline" className="bg-background">
                            <Waves className="mr-2 h-4 w-4"/>
                            Flood
                        </Button>
                        <Button variant="destructive">
                            <AlertTriangle className="mr-2 h-4 w-4"/>
                            Report
                        </Button>
                    </div>
                </div>
                <Card className="absolute bottom-4 left-4 w-80">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <span className="mr-2">Kathmandu</span>
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">High</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Selected location information</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}