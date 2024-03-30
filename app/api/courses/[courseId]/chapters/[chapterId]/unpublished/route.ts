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
        const unpublishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }, data: {
                isPublished: false
            }
        })
        const unpublishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        })
        if (!unpublishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId
                }, data: {
                    isPublished: false
                }
            })
        }

        return NextResponse.json(unpublishedChapter);
    } catch (error) {
        console.log("[UNPublished] ", error)
        return new NextResponse("Failed to publish chapter", { status: 500 })
    }
}