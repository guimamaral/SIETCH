import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface InquiryRequest {
  name: string;
  email: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: InquiryRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: body.email,
      subject: `Tutoring Inquiry from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
      html: `
        <h2>New Tutoring Inquiry</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
    });
  } catch (error) {
    console.error('Error processing tutoring inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
