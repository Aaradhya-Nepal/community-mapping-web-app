import { CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin } from "lucide-react"

interface PlacesListProps {
    places: google.maps.places.PlaceResult[]
}

export default function PlacesList({ places }: PlacesListProps) {
    return (
        <CardContent>
            <h3 className="font-semibold mb-2">Places</h3>
            <ScrollArea className="h-[200px]">
                {places.map((place, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{place.name}</span>
                    </div>
                ))}
            </ScrollArea>
        </CardContent>
    )
}