import { db } from "@/lib/db";
import { clientSecret } from "@/lib/paymob";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


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

        const userData = await req.json();

        if (!userData.firstName || !userData.lastName || !userData.email || !userData.phoneNumber) {
            return new NextResponse("Please fill the form before checkout", { status: 404 })
        }
        const { client_secret } = await clientSecret({ userData, course })
        if (!client_secret) {
            return new NextResponse("Payment failed. Please try again.", { status: 500, });
        }
        const url = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PUPLIC_KEY}&clientSecret=${client_secret}`
        return NextResponse.json(url);
    } catch (error) {

        console.log("[PAYMENT]", error);
        return new NextResponse("Payment failed. Please try again.", { status: 500, });
    }
}
