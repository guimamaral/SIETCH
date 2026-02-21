import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  escapeHtml,
  validateString,
  isValidEmail,
  checkRateLimit,
  isValidOrigin,
  INPUT_LIMITS,
} from '@/lib/security';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Allowed hosts for CSRF protection
const ALLOWED_HOSTS = process.env.ALLOWED_HOSTS?.split(',') || [
  'sietch.vercel.app',
  'gamaral.com',
];

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection: Validate origin
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    if (!isValidOrigin(origin, referer, ALLOWED_HOSTS)) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
    }

    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const rateLimit = checkRateLimit(clientIp, 5, 60 * 60 * 1000); // 5 per hour

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimit.resetIn / 1000).toString(),
          },
        }
      );
    }

    // Validate Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      );
    }

    // Check request body size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > INPUT_LIMITS.requestBodySize) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }

    const body = await request.json();

    // Validate and sanitize name
    const name = validateString(
      body.name,
      INPUT_LIMITS.name.min,
      INPUT_LIMITS.name.max
    );
    if (!name) {
      return NextResponse.json(
        { error: `Name must be between ${INPUT_LIMITS.name.min} and ${INPUT_LIMITS.name.max} characters` },
        { status: 400 }
      );
    }

    // Validate and sanitize email
    const email = validateString(
      body.email,
      INPUT_LIMITS.email.min,
      INPUT_LIMITS.email.max
    );
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate and sanitize message
    const message = validateString(
      body.message,
      INPUT_LIMITS.message.min,
      INPUT_LIMITS.message.max
    );
    if (!message) {
      return NextResponse.json(
        { error: `Message must be between ${INPUT_LIMITS.message.min} and ${INPUT_LIMITS.message.max} characters` },
        { status: 400 }
      );
    }

    // Escape HTML for email template to prevent injection
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    // Send email with escaped content
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email, // Use original email for reply-to
      subject: `Tutoring Inquiry from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Tutoring Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
