import Mux from "@mux/mux-node";

import { NextResponse } from "next/server"

import { db } from "@/lib/db";
const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
})
export const POST = async (req: Request) => {
    try {
        const { type: eventType, data: eventData } = await req.json();

        if (eventType === 'video.asset.ready') {
            const chapter = await db.chapter.update({
                where: {
                    id: eventData.passthrough,
                }, data: {
                    videoUrl: eventData.playback_ids[0].id
                }
            })
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: eventData.passthrough
                }
            })
            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);

                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                });
            }
            await db.muxData.create({
                data: {
                    chapterId: eventData.passthrough,
                    assetId: eventData.id,
                    playbackId: eventData.playback_ids[0].id,
                }
            })

        }
        return NextResponse.json({ massage: "success" })
    } catch (error) {
        console.log("[CHAPTER_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}