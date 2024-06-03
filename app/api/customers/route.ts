import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        const { userEmail, name, courseId } = await req.json();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const users = await clerkClient.users.getUserList({ emailAddress: userEmail });

        if (users.length === 0) {
            return new NextResponse("User not found", { status: 404 });
        }

        const { id } = users[0];

        let user = await db.paymobCustomer.findUnique({
            where: {
                userId: id,
                userName: name,
                userEmail: userEmail
            }, select: {
                PaymobCustomerId: true
            }
        })
        if (!user) {
            const newUser = await db.paymobCustomer.create({
                data: {
                    userId: id,
                    PaymobCustomerId: `${id}`,
                    userName: name,
                    userEmail: userEmail
                }
            })
        }
        await db.purchase.create({
            data: {
                courseId: "daa55d4f-b2e6-4dc8-b147-48d93382a52f",
                userId: id,
            }
        })
        return NextResponse.json("Customer Created", { status: 201 });
    } catch (error) {
        console.log("[Courses]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
};