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
        const { userEmail, name, courseId, chapterId } = await req.json();

        const users = await clerkClient.users.getUserList({ emailAddress: userEmail });

        if (users.length === 0) {
            throw new Error("User not found");
        }
        const { id } = users[0];
        const courseOwner = await db.course.findUnique({
            where: {
                userId: userId,
                id: courseId
            }
        });
        if (!courseOwner) {
            throw new Error("user not found");
        }
        let user = await db.chapterCustomer.findUnique({
            where: {
                userId: id,
                userEmail: userEmail
            }, select: {
                PaymobBuyerId: true
            }
        })

        if (!user) {
            await db.chapterCustomer.create({
                data: {
                    userId: id,
                    PaymobBuyerId: `${id}`,
                    userName: name,
                    userEmail: userEmail,
                    totalChapters: 0,
                }
            })
        }

        const purchase = await db.purchaseChapters.create({
            data: {
                chapterId: chapterId,
                userId: id,
            }
        })
        if (purchase) {
            await db.chapterCustomer.update({
                where: {
                    userId: id
                },
                data: {
                    totalChapters: {
                        increment: 1
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