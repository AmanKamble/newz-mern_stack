import { createTransport } from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
    const transporter = createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    } as any);


    await transporter.sendMail({
        to,
        subject,
        text,
    });
}