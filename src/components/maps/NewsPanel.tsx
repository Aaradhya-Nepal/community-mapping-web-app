import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import React from "react";
import Image from "next/image";
import Loader from "@/components/loader/Loader";

export default function NewsPanel({newsData}: any) {
    if (!newsData) return <Loader/>;

    return (
        <Card className="shadow-none border-none">
            <CardHeader>
                <CardTitle>Latest Flood News</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px]">
                    {newsData.articles.map((item: any, index: number) => (
                        <div key={index} className="mb-4">
                            <Image
                                className=" h-4 w-4 rounded-full"
                                src={item.urlToImage ?? ''}
                                width={200}
                                height={200}
                                alt={item.title}
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