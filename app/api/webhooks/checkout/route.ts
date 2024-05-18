
import { NextResponse } from "next/server"

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

export const POST = async (req: Request) => {
    try {
        const data = await req.json();

        if (data.obj.success === true) {
            const USER_DATA = JSON.parse(data.obj.payment_key_claims.billing_data.extra_description);
            let user = await db.paymobCustomer.findUnique({
                where: {
                    userId: USER_DATA.userId
                }, select: {
                    PaymobCustomerId: true
                }
            })
            if (!user) {
                const newUser = await db.paymobCustomer.create({
                    data: {
                        userId: USER_DATA.userId,
                        PaymobCustomerId: `${data.obj.payment_key_claims.user_id}`
                    }
                })
            }
            await db.purchase.create({
                data: {
                    courseId: USER_DATA.courseId,
                    userId: USER_DATA.userId,
                }
            })
        }
        return new NextResponse("Payment Success", { status: 200 })
        // return NextResponse.redirect("/dashboard")
        // redirect("/dashboard") // Navigate to the new post page


    } catch (error) {
        console.log("[COURSE_PAYMENT]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


