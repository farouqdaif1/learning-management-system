import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const DELETE = async (req: Request, { params }: { params: { customerId: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const customer = await db.paymobCustomer.findFirst({
            where: {
                id: params.customerId
            }
        });
        if (!customer) {
            return new NextResponse("Customer not found", { status: 404 });
        }
        const purchases = await db.purchase.findMany({
            where: {
                userId: customer.userId
            }
        });
        if (purchases.length > 0) {
            await db.purchase.deleteMany({
                where: {
                    userId: customer.userId
                }
            });
        }
        await db.paymobCustomer.delete({
            where: {
                id: params.customerId
            }
        });
        return NextResponse.json("Customer Deleted", { status: 200 });
    } catch (error) {
        console.log("[Delete Customer]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
}