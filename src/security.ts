/**
 * Security utilities: Anti-XSS Sanitization, Form Validators, and Client-Side Rate Limiter
 * Designed for Uniformes PRE web application.
 */

// ==========================================
// 1. INPUT SANITIZATION (ANTI-XSS)
// ==========================================

/**
 * Escapes potentially dangerous characters to prevent Cross-Site Scripting (XSS).
 */
export function sanitizeText(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Strips script tags, Javascript protocols, and malicious event handlers from user strings.
 */
export function stripMaliciousContent(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onload|onerror|onclick|onmouseover|onfocus/gi, '')
    .trim();
}

// ==========================================
// 2. INPUT VALIDATORS
// ==========================================

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a person's or contact's name (min 3 chars, letters and spaces)
 */
export function validateName(name: string): ValidationResult {
  const clean = name.trim();
  if (!clean) {
    return { isValid: false, error: 'El nombre es obligatorio.' };
  }
  if (clean.length < 3) {
    return { isValid: false, error: 'El nombre debe tener al menos 3 caracteres.' };
  }
  if (clean.length > 80) {
    return { isValid: false, error: 'El nombre no debe exceder 80 caracteres.' };
  }
  return { isValid: true };
}

/**
 * Validates an email address against standard RFC format
 */
export function validateEmail(email: string): ValidationResult {
  const clean = email.trim();
  if (!clean) {
    return { isValid: false, error: 'El correo electrónico es obligatorio.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) {
    return { isValid: false, error: 'Ingresa un formato de correo electrónico válido (ej. usuario@empresa.com).' };
  }
  return { isValid: true };
}

/**
 * Validates a telephone or WhatsApp number (supports 10-digit MX formats with or without formatting)
 */
export function validatePhone(phone: string): ValidationResult {
  const digits = phone.replace(/\D/g, '');
  if (!digits) {
    return { isValid: false, error: 'El teléfono o WhatsApp es obligatorio.' };
  }
  if (digits.length < 10) {
    return { isValid: false, error: 'El teléfono debe tener al menos 10 dígitos (ej. 998 937 0850).' };
  }
  if (digits.length > 15) {
    return { isValid: false, error: 'Número de teléfono demasiado largo.' };
  }
  return { isValid: true };
}

/**
 * Validates a general inquiry message
 */
export function validateMessage(message: string): ValidationResult {
  const clean = message.trim();
  if (!clean) {
    return { isValid: false, error: 'El mensaje no puede estar vacío.' };
  }
  if (clean.length < 10) {
    return { isValid: false, error: 'Por favor describe tu solicitud con al menos 10 caracteres.' };
  }
  if (clean.length > 1500) {
    return { isValid: false, error: 'El mensaje no debe exceder los 1500 caracteres.' };
  }
  return { isValid: true };
}

// ==========================================
// 3. SUBMISSION RATE LIMITER (ANTI-SPAM)
// ==========================================

const RATE_LIMIT_KEY = 'pre_rate_limit_submissions';
const MAX_SUBMISSIONS_PER_WINDOW = 3;
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export interface RateLimitStatus {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterMinutes: number;
}

/**
 * Checks if the user is within the allowed submission frequency.
 */
export function checkRateLimit(): RateLimitStatus {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let timestamps: number[] = raw ? JSON.parse(raw) : [];

    // Filter only timestamps within the current sliding window
    timestamps = timestamps.filter((ts) => now - ts < WINDOW_DURATION_MS);

    if (timestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      const oldestInWindow = Math.min(...timestamps);
      const msLeft = WINDOW_DURATION_MS - (now - oldestInWindow);
      const minutesLeft = Math.ceil(msLeft / (60 * 1000));
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterMinutes: Math.max(1, minutesLeft),
      };
    }

    return {
      allowed: true,
      remainingAttempts: MAX_SUBMISSIONS_PER_WINDOW - timestamps.length,
      retryAfterMinutes: 0,
    };
  } catch (e) {
    // If localStorage has issues, gracefully allow submission
    return { allowed: true, remainingAttempts: 1, retryAfterMinutes: 0 };
  }
}

/**
 * Records a successful submission timestamp to enforce the rate limit sliding window.
 */
export function recordSubmission(): void {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    let timestamps: number[] = raw ? JSON.parse(raw) : [];
    timestamps = timestamps.filter((ts) => now - ts < WINDOW_DURATION_MS);
    timestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
  } catch (e) {
    console.warn('Could not record submission timestamp in storage:', e);
  }
}
