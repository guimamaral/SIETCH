/**
 * Security utilities for input sanitization and validation
 */

/**
 * Escapes HTML special characters to prevent XSS/injection attacks
 */
export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

/**
 * Input validation constraints
 */
export const INPUT_LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 },
  message: { min: 10, max: 5000 },
  requestBodySize: 50 * 1024, // 50KB
} as const;

/**
 * Validates and sanitizes a string input
 * Returns null if invalid, trimmed string if valid
 */
export function validateString(
  input: unknown,
  minLength: number,
  maxLength: number
): string | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (trimmed.length < minLength || trimmed.length > maxLength) return null;
  return trimmed;
}

/**
 * Validates email format using a more robust regex
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 simplified - handles most real-world emails
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && !email.includes('..');
}

/**
 * Simple in-memory rate limiter
 * For production, use Redis-based solution (Upstash)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetIn: record.resetTime - now,
  };
}

/**
 * Validates request origin for CSRF protection
 */
export function isValidOrigin(
  origin: string | null,
  referer: string | null,
  allowedHosts: string[]
): boolean {
  // In development, allow localhost
  const devHosts = ['localhost', '127.0.0.1'];
  const allAllowedHosts = [...allowedHosts, ...devHosts];

  const checkHost = (url: string | null): boolean => {
    if (!url) return false;
    try {
      const hostname = new URL(url).hostname;
      return allAllowedHosts.some(
        (allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`)
      );
    } catch {
      return false;
    }
  };

  // Check origin first, then referer as fallback
  if (origin) return checkHost(origin);
  if (referer) return checkHost(referer);

  // No origin or referer - reject in production, allow in dev
  return process.env.NODE_ENV === 'development';
}
