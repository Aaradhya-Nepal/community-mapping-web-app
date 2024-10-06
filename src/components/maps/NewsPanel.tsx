import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import React from "react";
import Image from "next/image";

interface NewsPanelProps {
    newsData: { title: string; description: string; url: string; image: string }[] | undefined;
}

export default function NewsPanel({newsData}: NewsPanelProps) {
    if (!newsData) return null;

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>Latest Flood News</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px]">
                    {newsData.map((item, index) => (
                        <div key={index} className="mb-4">
                            <Image
                                className=" h-4 w-4 rounded-full"
                                src={item.image}
                                alt=""
                            />
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                               className="text-sm text-blue-500 hover:underline">
                                Read more
                            </a>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}