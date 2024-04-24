import { db } from "@/lib/db";
import { clientSecret } from "@/lib/paymob";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { courseId: string } }) => {
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

        const { client_secret } = await clientSecret()
        const url = `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PUPLIC_KEY}&clientSecret=${client_secret}`
        return NextResponse.json(url);
    } catch (error) {
        console.log("PAYMENT", error)
        return new NextResponse("Payment failed. Please try again.")
    }
}