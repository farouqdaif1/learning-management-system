import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const PATCH = async (req: Request, { params }: { params: { courseId: string } }) => {
    try {
        const { userId } = auth();
        const { courseId } = params
        const values = await req.json()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db.course.update({
            where: {
                id: courseId,
                userId: userId
            }, data: {
                ...values
            }
        })
        console.log(course)

        return NextResponse.json(course);

    } catch (error) {
        console.log("[CourseId]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}