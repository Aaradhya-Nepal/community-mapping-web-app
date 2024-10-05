import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"

interface FloodInfoProps {
    floodAreas: { center: google.maps.LatLngLiteral; radius: number }[]
}

export default function FloodInfo({floodAreas}: FloodInfoProps) {
    return (
        <Card className="w-[300px]">
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
    )
}