import {Input} from "@/components/ui/input"
import {CardHeader, CardTitle} from "@/components/ui/card"
import {Search} from "lucide-react"

interface SearchBarProps {
    onSearch: (address: string) => void
}

export default function SearchBar({onSearch}: SearchBarProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <CardHeader>
            <CardTitle className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input
                    placeholder="Location Nearby"
                    className="pl-8"
                    onChange={handleInputChange}
                />
            </CardTitle>
        </CardHeader>
    )
}