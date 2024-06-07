import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { userEmail, name, courseId } = await req.json();

        const users = await clerkClient.users.getUserList({ emailAddress: userEmail });

        if (users.length === 0) {
            throw new Error("User not found");
        }
        const { id } = users[0];
        const courseOwner = await db.course.findUnique({
            where: {
                userId: userId,
                id: courseId
            }, select: {
                price: true,

            }
        });
        if (!courseOwner) {
            throw new Error("Course not found");
        }
        let user = await db.paymobCustomer.findUnique({
            where: {
                userId: id,
                userEmail: userEmail
            }, select: {
                PaymobBuyerId: true
            }
        })

        if (!user) {
            await db.paymobCustomer.create({
                data: {
                    userId: id,
                    PaymobBuyerId: `${id}`,
                    userName: name,
                    userEmail: userEmail,
                    totalCourses: 0,
                    totalPurchases: 0,
                }
            })
        }

        const purchase = await db.purchase.create({
            data: {
                courseId: courseId,
                userId: id,
            }
        })
        if (purchase) {
            await db.paymobCustomer.update({
                where: {
                    userId: id
                },
                data: {
                    totalCourses: {
                        increment: 1
                    },
                    totalPurchases: {
                        increment: courseOwner.price!
                    },
                    userName: name,
                    userEmail: userEmail,
                }
            })

        }
        return NextResponse.json("Customer Created", { status: 201 });
    } catch (error) {
        console.log("[Courses]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
};
export const GET = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const customers = await db.paymobCustomer.findMany({
            select: {
                id: true,
                userName: true,
                userEmail: true
            }
        });

        return NextResponse.json(customers, { status: 200 });

    } catch (error) {
        console.log("[Customer For Buyera]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
}
