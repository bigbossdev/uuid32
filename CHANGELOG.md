# Changelog

## [0.1.0] - 2025-01-27

### Added
- Initial release of @bboss/uuid32
- UUID to Crockford Base32 encoding/decoding
- `generateBase32()`, `encode()`, `decode()`, `isValidBase32()` functions
- TypeScript support with zero dependencies
- Node.js 16+ only (requires crypto.randomUUID())
- Crockford Base32 character set (excludes I, L, O, U)
- Product Key and API Key generation support