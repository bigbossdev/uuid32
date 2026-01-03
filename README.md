# @bboss/uuid32

A lightweight TypeScript library for encoding and decoding UUIDs to/from Crockford Base32 strings.

## Features

- 🚀 **Fast & Lightweight**: Zero dependencies, optimized for performance
- 🌐 **Universal**: Works in Node.js and modern browsers
- 📦 **TypeScript Native**: Full TypeScript support with type definitions
- 🧪 **Well Tested**: Comprehensive test suite with high coverage
- 🔧 **Simple API**: Easy-to-use functions for encoding, decoding, and validation
- 🛡️ **User-Friendly**: Excludes confusing characters (I, L, O, U) to prevent input errors

## Use Cases

- **Product Key Generation**: Software license keys, serial numbers
- **API Key Generation**: Service authentication tokens, access keys
- **Short IDs**: URL shortening, reference codes, tracking IDs
- **Manual Input**: Reduced errors when users need to type keys manually

## Installation

```bash
# npm
npm install @bboss/uuid32

# yarn
yarn add @bboss/uuid32
```

## Requirements

- Requires an environment with `crypto.randomUUID()` support (e.g., Node.js 16+ or modern browsers).

## Usage

```javascript
import uuid32 from '@bboss/uuid32';
// const uuid32 = require('@bboss/uuid32'); // legacy way

// Generate a new Base32 UUID
const shortId = uuid32.generateBase32();
console.log(shortId); // → "29STNWYQG28H4VWA59PD0XYJR8" (random)

// Encode existing UUID to Base32
const encoded = uuid32.encode('49ceabcf-5e02-4449-be28-a9b341df4b08');
console.log(encoded); // → "29STNWYQG28H4VWA59PD0XYJR8"

// Decode Base32 back to standard UUID
const decoded = uuid32.decode('29STNWYQG28H4VWA59PD0XYJR8');
console.log(decoded); // → "49ceabcf-5e02-4449-be28-a9b341df4b08"

// Validation
console.log(uuid32.isValidBase32('29STNWYQG28H4VWA59PD0XYJR8')); // → true
```

## API Reference

### `generateBase32(): string`
Generates a new UUID v4 using `crypto.randomUUID()` and encodes it to Crockford Base32.

**Returns:** Base32 encoded UUID string

### `encode(uuid: string): string`
Encodes a standard UUID to Crockford Base32 format.

**Parameters:**
- `uuid` - Standard UUID string (with or without hyphens)

**Returns:** Base32 encoded string

**Throws:** Error if UUID format is invalid

### `decode(base32: string): string`
Decodes a Crockford Base32 string back to standard UUID format.

**Parameters:**
- `base32` - Base32 encoded string

**Returns:** Standard UUID string with hyphens

**Throws:** Error if Base32 format is invalid

### `isValidBase32(str: string): boolean`
Validates if a string is a valid Crockford Base32 format.

**Parameters:**
- `str` - String to validate

**Returns:** `true` if valid Base32, `false` otherwise

## Error Handling

The library throws descriptive errors for invalid inputs:

```javascript
try {
    uuid32.encode('invalid-uuid');
} catch (error) {
    console.log(error.message); // → "Invalid UUID format"
}

try {
    uuid32.decode('invalid@base32!');
} catch (error) {
    console.log(error.message); // → "Invalid Base32 format"
}
```

## Crockford Base32 Character Set

Uses the following 32 characters: `0123456789ABCDEFGHJKMNPQRSTVWXYZ`

**Excluded characters for clarity:**
- `I` (can be confused with `1`)
- `L` (can be confused with `1`) 
- `O` (can be confused with `0`)
- `U` (can be confused with `V`)

This makes the encoded strings more reliable for manual input and reduces transcription errors.

## License

MIT License - see [LICENSE](LICENSE) file for details.