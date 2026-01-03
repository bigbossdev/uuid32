import { randomUUID } from 'crypto';
import {
    BASE32_CHARS,
    isValidUuid,
    isValidBase32,
    normalizeUuid,
    formatUuid
} from './utils';


/**
 * Encodes a UUID to Crockford Base32 string
 */
export function encode(uuid: string): string {
    if (!isValidUuid(uuid)) {
        throw new Error('Invalid UUID format');
    }

    const normalized = normalizeUuid(uuid);
    const hex = BigInt('0x' + normalized);
    
    if (hex === 0n) return '0'.padStart(26, '0');
    
    let result = '';
    let num = hex;
    
    while (num > 0n) {
        result = BASE32_CHARS[Number(num % 32n)] + result;
        num = num / 32n;
    }
    
    return result.padStart(26, '0');
}

/**
 * Decodes a Crockford Base32 string to UUID
 */
export function decode(base32: string): string {
    if (!isValidBase32(base32)) {
        throw new Error('Invalid Base32 format');
    }
    
    let num = 0n;
    
    for (let i = 0; i < base32.length; i++) {
        const char = base32[i];
        const index = BASE32_CHARS.indexOf(char);
        if (index === -1) {
            throw new Error('Invalid Base32 character');
        }
        num = num * 32n + BigInt(index);
    }
    
    let hex = num.toString(16).padStart(32, '0');
    
    if (hex.length > 32) {
        throw new Error('Invalid Base32 value: too large for UUID');
    }
    
    return formatUuid(hex);
}

/**
 * Generates a new UUID v4 and encodes it to Crockford Base32
 */
export function generateBase32(): string {
    const uuid = randomUUID();
    return encode(uuid);
}

// Export utility functions
export { isValidBase32 };

// Default export for CommonJS compatibility
export default {
    generateBase32,
    encode,
    decode,
    isValidBase32
};