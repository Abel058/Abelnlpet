/**
 * Security utilities for the portfolio.
 * Enforces strict URL validation, prevents reverse-tabnabbing,
 * and prevents script injection/XSS vectors.
 */

const ALLOWED_PROTOCOLS = new Set(['https:', 'http:', 'mailto:']);

/**
 * Validates that a URL string uses safe protocols only.
 * Rejects javascript:, data:, vbscript:, and relative unexpected vectors.
 */
export function isSafeUrl(urlStr: string | undefined): boolean {
  if (!urlStr || typeof urlStr !== 'string') return false;
  const trimmed = urlStr.trim();
  if (!trimmed) return false;

  // Relative anchor links inside the page are safe
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return true;
  }

  try {
    const parsed = new URL(trimmed, window.location.origin);
    return ALLOWED_PROTOCOLS.has(parsed.protocol);
  } catch {
    // If URL parsing fails, check simple mailto
    if (trimmed.startsWith('mailto:')) {
      const email = trimmed.replace('mailto:', '');
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    return false;
  }
}

/**
 * Safely sanitizes user text inputs to prevent XSS.
 */
export function sanitizeSearchTerm(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>'"]/g, '')
    .trim()
    .slice(0, 100);
}
