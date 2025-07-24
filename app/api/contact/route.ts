// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();
 

  // Setup your SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      text: `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Message: ${data.message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
 
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
