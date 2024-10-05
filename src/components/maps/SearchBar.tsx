import { useState } from "react"
import { Input } from "@/components/ui/input"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

interface SearchBarProps {
    onSearch: (address: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(searchValue)
    }

    return (
        <CardHeader>
            <CardTitle>
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Location"
                        className="pl-8"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
            </CardTitle>
        </CardHeader>
    )
}