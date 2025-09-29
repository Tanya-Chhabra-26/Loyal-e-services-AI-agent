// app/api/sendMail/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const pdf1Path = path.join(process.cwd(), 'public/assets/Thank-you-page.pdf');
        const pdf2Path = path.join(process.cwd(), 'public/assets/Video-Questionnaire.pdf');

        const mailOptions = {
            from: `"Loyale Services" <${process.env.SMTP_EMAIL}>`,
            to: email,
            subject: `Your Purchase Confirmation`,
            html: `<p>Hi ${name},</p><p>Thank you for trusting us.</p><p>Attached are your PDFs.</p>`,
            attachments: [
                {
                    filename: 'Brochure.pdf',
                    content: fs.readFileSync(pdf1Path),
                },
                {
                    filename: 'Instructions.pdf',
                    content: fs.readFileSync(pdf2Path),
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error: any) {
        console.error("❌ Email error details:");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
