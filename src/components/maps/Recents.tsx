import React from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

const Recents = ({recentData}: any) => {
    return (
        <>
            <Card className="w-[300px]">
                <CardHeader>
                    <CardTitle>Recent</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px]">
                        {recentData.map((item: any, index: number) => (
                            <div key={index} className="mb-4">
                                <p className="text-base font-medium text-gray-800">
                                    {item.title}
                                </p>
                                <p className=" text-sm text-gray-600 w-full">
                                    {item.description}
                                </p>
                                <Image
                                    className=" h-4 w-4 rounded-full"
                                    src={item.image}
                                    alt={item.title}
                                />
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
};

export default Recents;