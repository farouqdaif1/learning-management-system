import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const POST = async (req: Request) => {
    try {
        const { name, email, phoneNumber, massage } = await req.json();
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST as string,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@international-justice.com',
            subject: 'New Contact Us Form Submission',
            text: `
              Name: ${name}
              Email: ${email}
              Phone Number: ${phoneNumber}
              Message: ${massage}
            `,
        };
        await transporter.sendMail(mailOptions);
        return NextResponse.json("Email Sent Successfully", { status: 200 });

    } catch (error) {
        console.log("[EMAIL]", error);
        return new NextResponse("InternalError", { status: 500, });
    }
}