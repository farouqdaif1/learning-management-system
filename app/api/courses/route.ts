import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        const { title } = await req.json();
        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const course = await db.course.create({
            data: {
                userId,
                title,
            }
        });

        return NextResponse.json(course, { status: 201 });

    } catch (error) {
        console.log("[Courses]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
}
export const GET = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const courses = await db.course.findMany({
            where: {
                userId: userId,
                isPublished: true
            }, select: {
                id: true,
                title: true,
                chapters: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        return NextResponse.json(courses, { status: 200 });

    } catch (error) {
        console.log("[Courses]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
}