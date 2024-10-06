import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

interface FloodInfoProps {
    floodAreas: {
        center: google.maps.LatLngLiteral;
        radius: number;
        date: string;
        discharge: number;
        riskLevel: string;
    }[]
}

export default function FloodInfo({floodAreas}: FloodInfoProps) {
    return (
        <Card className="w-[320px] absolute top-60 right-0">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="mr-2">Flood Information</span>
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">High Risk</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 overflow-y-scroll overflow-hidden">
                    <p className="text-sm text-muted-foreground">
                        {floodAreas.length} flood-affected areas detected. Exercise caution and follow local
                        authorities&apos; instructions.
                    </p>
                    {floodAreas.map((area, index) => (
                        <div key={index} className="mt-6 flex flex-col gap-1">
                            <p className="text-sm"><strong>Date:</strong> {area.date}</p>
                            <p className="text-sm"><strong>Discharge:</strong> {area.discharge} m³/s</p>
                            <p className="text-sm"><strong>Risk Level:</strong> {area.riskLevel}</p>
                            <p className="text-sm"><strong>Radius:</strong> {area.radius} meters</p>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}