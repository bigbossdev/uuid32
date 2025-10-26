import { generateBase32, encode, decode, isValidBase32 } from '../src/index';

describe('UUID32 Library Tests', () => {
    
    test('encode: should encode UUID to Base32', () => {
        const uuid = '49ceabcf-5e02-4449-be28-a9b341df4b08';
        const encoded = encode(uuid);
        expect(typeof encoded).toBe('string');
        expect(encoded.length).toBe(26);
        expect(isValidBase32(encoded)).toBe(true);
    });

    test('encode: should always return 26-character string', () => {
        const testUuids = [
            '00000000-0000-0000-0000-000000000000',
            '49ceabcf-5e02-4449-be28-a9b341df4b08',
            'ffffffff-ffff-ffff-ffff-ffffffffffff'
        ];
        
        testUuids.forEach(uuid => {
            const encoded = encode(uuid);
            expect(encoded.length).toBe(26);
        });
    });

    test('encode: should handle UUID without hyphens', () => {
        const uuid = '49ceabcf5e024449be28a9b341df4b08';
        const encoded = encode(uuid);
        expect(isValidBase32(encoded)).toBe(true);
    });

    test('encode: should throw error for invalid UUID', () => {
        expect(() => encode('invalid-uuid')).toThrow(/Invalid UUID format/);
        expect(() => encode('')).toThrow(/Invalid UUID format/);
    });

    test('decode: should decode Base32 to UUID', () => {
        const uuid = '49ceabcf-5e02-4449-be28-a9b341df4b08';
        const encoded = encode(uuid);
        const decoded = decode(encoded);
        expect(decoded).toBe(uuid);
    });

    test('decode: should throw error for invalid Base32', () => {
        expect(() => decode('invalid@base32!')).toThrow(/Invalid Base32 format/);
        expect(() => decode('')).toThrow(/Invalid Base32 format/);
        expect(() => decode('INVALID')).toThrow(/Invalid Base32 format/);
    });

    test('SPEC.md example: should work with documented values', () => {
        const uuid = '49ceabcf-5e02-4449-be28-a9b341df4b08';
        const expectedBase32 = '29STNWYQG28H4VWA59PD0XYJR8';
        
        // Test encoding
        const encoded = encode(uuid);
        expect(encoded).toBe(expectedBase32);
        
        // Test decoding
        const decoded = decode(expectedBase32);
        expect(decoded).toBe(uuid);
        
        // Test validation
        expect(isValidBase32(expectedBase32)).toBe(true);
    });

    test('generateBase32: should generate valid Base32 UUID', () => {
        const uuid = generateBase32();
        expect(typeof uuid).toBe('string');
        expect(isValidBase32(uuid)).toBe(true);
        expect(uuid.length).toBe(26);
        
        // Should be able to decode back to valid UUID
        const decoded = decode(uuid);
        expect(decoded).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    test('generateBase32: should generate unique values', () => {
        const uuid1 = generateBase32();
        const uuid2 = generateBase32();
        expect(uuid1).not.toBe(uuid2);
    });

    test('isValidBase32: should validate Base32 formats', () => {
        expect(isValidBase32('29STNWYQG28H4VWA59PD0XYJR8')).toBe(true); // From SPEC.md example
        expect(isValidBase32('123ABC')).toBe(true);
        expect(isValidBase32('0123456789ABCDEFGHJKMNPQRSTVWXYZ')).toBe(true);
        expect(isValidBase32('invalid@base32!')).toBe(false);
        expect(isValidBase32('')).toBe(false);
        expect(isValidBase32('INVALID')).toBe(false); // Contains I, L, O, U
        expect(isValidBase32('test-with-hyphen')).toBe(false);
    });



    test('round-trip: encode/decode should be consistent', () => {
        const testUuids = [
            '49ceabcf-5e02-4449-be28-a9b341df4b08',
            '00000000-0000-0000-0000-000000000000',
            'ffffffff-ffff-ffff-ffff-ffffffffffff'
        ];

        testUuids.forEach(uuid => {
            const encoded = encode(uuid);
            const decoded = decode(encoded);
            expect(decoded).toBe(uuid);
        });
    });

    test('Crockford Base32: should exclude confusing characters', () => {
        const encoded = generateBase32();
        expect(encoded).not.toMatch(/[ILOU]/);
    });

    test('performance: should handle 1000 operations quickly', () => {
        const start = Date.now();
        
        for (let i = 0; i < 1000; i++) {
            const uuid = generateBase32();
            const decoded = decode(uuid);
            const reencoded = encode(decoded);
            expect(uuid).toBe(reencoded);
        }
        
        const duration = Date.now() - start;
        console.log(`1000 round-trip operations took ${duration}ms`);
        expect(duration).toBeLessThan(1000);
    });
});