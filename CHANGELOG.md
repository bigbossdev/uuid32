# Changelog

## [1.1.0] - 2026-01-03

- **Feature**: Remove Node.js environment check to support browser environments.
- **Docs**: Update documentation to reflect cross-environment compatibility.

## [1.0.0] - 2025-10-27

- Stable release - no breaking changes from 0.1.0
- Production ready

## [0.1.0] - 2025-10-27

- Initial release of @bboss/uuid32
- UUID to Crockford Base32 encoding/decoding
- `generateBase32()`, `encode()`, `decode()`, `isValidBase32()` functions
- TypeScript support with zero dependencies
- Node.js 16+ only (requires crypto.randomUUID())
- Crockford Base32 character set (excludes I, L, O, U)
- Product Key and API Key generation support