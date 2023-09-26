import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import Contact from '@/models/Contact';

export async function POST(request) {
    try {
        const reqData = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "nayaksoumyaprakash3@gmail.com",
                pass: process.env.MAIL_APP_PASSWORD,
            }
        });

        const info = await transporter.sendMail({
            from: 'support@iblog.com', // sender address
            to: "nsoumyaprakash@gmail.com", // list of receivers
            subject: reqData.subject, // Subject line
            text: reqData.message, // text body
        });

        const contact = new Contact({
            email: reqData.email,
            subject: reqData.subject,
            message: reqData.message
        });

        await contact.save();

        return NextResponse.json({ success: true, data: { message: "Thanks for contacting us! We will get back to you soon." }, result: info.messageId });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}