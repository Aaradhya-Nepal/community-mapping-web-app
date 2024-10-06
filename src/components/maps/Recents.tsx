import React from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

interface Thumbnail {
    url: string;
}

interface Snippet {
    title: string;
    description: string;
    thumbnails: {
        default: Thumbnail;
    };
}

interface Item {
    id: {
        videoId: string;
    };
    snippet: Snippet;
}

interface RecentData {
    items: Item[];
}

const Recents = ({recentData}: { recentData: RecentData }) => {
    return (
        <>
            <Card className="shadow-none border-none">
                <CardHeader>
                    <CardTitle>Recent Videos</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px]">
                        {recentData.items.map((item: Item, index: number) => (
                            <div key={index} className="mb-4">
                                <p className="text-base font-medium text-gray-800">
                                    {item.snippet.title}
                                </p>
                                <p className="text-sm text-gray-600 w-full">
                                    {item.snippet.description}
                                </p>
                                <Image
                                    className="h-4 w-4 rounded-full"
                                    src={item.snippet.thumbnails.default.url}
                                    alt={item.snippet.title}
                                    width={200}
                                    height={200}
                                />
                                <a
                                    href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    Watch Video
                                </a>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
};

export default Recents;