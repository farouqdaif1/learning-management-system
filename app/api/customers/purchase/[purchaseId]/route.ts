import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
export const DELETE = async (req: Request, { params }: { params: { purchaseId: string } }) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const purchase = await db.purchase.findUnique({
            where: {
                id: params.purchaseId,
            }
        });
        if (!purchase) {
            return new NextResponse("Not found", { status: 404 });
        }
        const course = await db.course.findUnique({
            where: {
                id: purchase.courseId,
                userId: userId,
            },
        });

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        const deletedPurchase = await db.purchase.delete({
            where: {
                id: params.purchaseId,
            }
        });
        if (purchase) {
            await db.paymobCustomer.update({
                where: {
                    userId: deletedPurchase.userId
                },
                data: {
                    totalCourses: {
                        decrement: 1
                    },
                    totalPurchases: {
                        decrement: course.price!
                    },
                }
            });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}