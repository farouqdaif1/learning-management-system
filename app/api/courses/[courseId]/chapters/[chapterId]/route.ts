import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

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
        console.log(chapter)

        //TODO HANDEL VIDEO UPLOAD
        return NextResponse.json(chapter)
    } catch (error) {
        console.log("[CHAPTER_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}