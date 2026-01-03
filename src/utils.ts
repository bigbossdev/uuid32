/**
 * Crockford Base32 character set (excludes I, L, O, U to avoid confusion)
 */
export const BASE32_CHARS = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

/**
 * UUID validation regex (with or without hyphens)
 */
const UUID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

/**
 * Crockford Base32 validation regex
 */
const BASE32_REGEX = /^[0-9ABCDEFGHJKMNPQRSTVWXYZ]+$/;

/**
 * Validates if a string is a valid UUID format
 */
export function isValidUuid(str: string): boolean {
    if (typeof str !== 'string') return false;
    return UUID_REGEX.test(str);
}

/**
 * Validates if a string is a valid Crockford Base32 format
 */
export function isValidBase32(str: string): boolean {
    if (typeof str !== 'string') return false;
    return BASE32_REGEX.test(str) && str.length > 0;
}

/**
 * Normalizes UUID by removing hyphens
 */
export function normalizeUuid(uuid: string): string {
    return uuid.replace(/-/g, '');
}

/**
 * Formats UUID by adding hyphens
 */
export function formatUuid(uuid: string): string {
    return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20, 32)}`;
}
