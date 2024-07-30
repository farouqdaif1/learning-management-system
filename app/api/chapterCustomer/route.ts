import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { calcDate } from "@/lib/expiration-time"
export const POST = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { userEmail, name, courseId, chapterId, watches, seeTime } = await req.json();

        const users = await clerkClient.users.getUserList({ emailAddress: userEmail });
        if (users.length === 0) {
            return new NextResponse("No user", { status: 401 });
        }
        const { id } = users[0];
        const courseOwner = await db.course.findUnique({
            where: {
                userId: userId,
                id: courseId
            }
        });
        if (!courseOwner) {
            throw new NextResponse("user not found", { status: 401 });
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
        const expireDate = calcDate(seeTime)
        const purchase = await db.purchaseChapters.create({
            data: {
                chapterId: chapterId,
                userId: id,
                watchNumber: watches,
                whatched: 1,
                seeTime: expireDate,
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
        console.log("[ChapterPUrchasePost]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
};
export const PUT = async (req: Request) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { chapterId, userEmail } = await req.json();
        const chapterCustomer = await db.chapterCustomer.findUnique({
            where: {
                userId: userId,
                userEmail: userEmail
            }
        });
        if (!chapterCustomer) {
            return new NextResponse("No User", { status: 401 });
        }
        const purchase = await db.purchaseChapters.findUnique({
            where: {
                userId_chapterId: {
                    userId: userId,
                    chapterId: chapterId
                }
            }
        });
        if (!purchase) {
            return new NextResponse("No purchase", { status: 401 });
        }
        if (purchase) {
            await db.purchaseChapters.update({
                where: {
                    userId_chapterId: {
                        userId: userId,
                        chapterId: chapterId
                    }
                },
                data: {
                    whatched: {
                        increment: 1
                    },
                }
            })
        }
        if (purchase.whatched === purchase.watchNumber) {
            await db.purchaseChapters.delete({
                where: {
                    userId_chapterId: {
                        userId: userId,
                        chapterId: chapterId
                    }
                },
            })
            const customer = await db.chapterCustomer.update({
                where: {
                    userId: userId
                },
                data: {
                    totalChapters: {
                        decrement: 1
                    }
                }
            })
            if (customer.totalChapters === 0) {
                await db.chapterCustomer.delete({
                    where: {
                        userId: userId
                    }
                })
            }
        }
        return NextResponse.json("Chapter Updated", { status: 200 });

    } catch (error) {
        console.log("[ChapterPUrchaseUpdate]", error);
        return new NextResponse("InternalError", { status: 500, });

    }
}
