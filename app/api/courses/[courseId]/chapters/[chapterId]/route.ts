import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { db } from "@/lib/db";
const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
})

export const PATCH = async (req: Request, { params }: { params: { courseId: string, chapterId: string } }) => {
    try {
        const { userId } = auth();
        const { isPublished, ...values } = await req.json()
        if (!userId) {
            return new NextResponse("Unauthorized user", { status: 401 })
        }
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })
        if (!courseOwner) {
            return new NextResponse("unauthorized user", { status: 401 });
        }
        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }, data: {
                ...values,
            }
        })
        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId
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
            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy: ['public'],
                test: false
            });
            await db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                }
            })
        }

        return NextResponse.json(chapter)
    } catch (error) {
        console.log("[CHAPTER_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export const DELETE = async (req: Request, { params }: { params: { courseId: string, chapterId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized user", { status: 401 })
        }
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })
        if (!courseOwner) {
            return new NextResponse("unauthorized user", { status: 401 });
        }
        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })
        if (!chapter) {
            return new NextResponse("Chapter not found", { status: 404 })
        }
        if (chapter.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId
                }
            })
            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }
        }
        const deletedChapter = await db.chapter.delete({
            where: {
                id: params.chapterId
            }
        })
        const publishedChapterInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        })
        if (!publishedChapterInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId
                }
                , data: {
                    isPublished: false
                }
            })
        }

        return NextResponse.json(deletedChapter)
    } catch (error) {
        console.log("[CHAPTER_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}