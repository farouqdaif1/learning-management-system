import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: {
    params: {
        courseId: string;
        chapterId: string;
    }
}) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const ownerCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })
        if (!ownerCourse) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        })
        const muxData = await db.muxData.findFirst({
            where: {
                chapterId: params.chapterId
            }
        })
        if (!chapter || !muxData || !chapter.description || !chapter.title || !chapter.videoUrl) {
            return new NextResponse("Missing required field", { status: 400 })
        }
        const publishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }, data: {
                isPublished: true
            }
        })

        return NextResponse.json(publishedChapter);
    } catch (error) {
        console.log("[published] ", error)
        return new NextResponse("Failed to publish chapter", { status: 500 })
    }
}