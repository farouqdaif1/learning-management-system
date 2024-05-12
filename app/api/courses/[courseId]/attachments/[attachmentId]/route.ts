import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export const DELETE = async (req: Request, {
    params
}: { params: { courseId: string, attachmentId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        })
        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const attachment = await db.attachment.delete({
            where: {
                id: params.attachmentId
            }
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("[CourseId_Attachments]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}