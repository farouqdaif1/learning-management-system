import { db } from "@/lib/db";
import { OrderID, PaymentKey, getToken } from "@/lib/payMobActions";
import { clientSecret } from "@/lib/paymob";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";


// export const POST = async (req: Request, { params }: { params: { courseId: string } }) => {
//     try {

//         const { userId } = auth();
//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 })
//         }

//         const course = await db.course.findUnique({
//             where: {
//                 id: params.courseId
//             }
//         })

//         if (!course) {
//             return new NextResponse("Course not found", { status: 404 })
//         }

//         const userData = await req.json();

//         if (!userData.firstName || !userData.lastName || !userData.email || !userData.phoneNumber) {
//             return new NextResponse("Please fill the form before checkout", { status: 404 })
//         }
//         const { client_secret } = await clientSecret({ userData, course })
//         if (!client_secret) {
//             return new NextResponse("Payment failed. Please try again.", { status: 500, });
//         }
//         const url = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PUPLIC_KEY}&clientSecret=${client_secret}`
//         return NextResponse.json(url);
//     } catch (error) {

//         console.log("[PAYMENT]", error);
//         return new NextResponse("Payment failed. Please try again.", { status: 500, });
//     }
// }
export const POST = async (req: Request, { params }: { params: { courseId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const course = await db.course.findUnique({
            where: {
                id: params.courseId
            }
        })
        if (!course) {
            return new NextResponse("Course not found", { status: 404 })
        }
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: params.courseId
                }
            }
        });
        if (purchase) {
            return new NextResponse("You already purchased this course", { status: 400 })
        }

        const values = await req.json();
        const token = await getToken();
        const orderId = await OrderID(token.token, course);
        const paymentKey = await PaymentKey(token.token, orderId.id, course, values, userId);
        return NextResponse.json(paymentKey);
    } catch (error) {
        console.log("[PAYMENT]", error);
        return new NextResponse("Payment failed. Please try again.", { status: 500, });

    }

};
