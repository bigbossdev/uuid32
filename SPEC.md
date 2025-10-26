# @bboss/uuid32 프로젝트 요구사항

## 개요
UUID(Universally Unique Identifier)를 Crockford Base32로 인코딩/디코딩하는 TypeScript 라이브러리

## 활용 사례
- **Product Key 생성**: 소프트웨어 라이선스 키, 시리얼 번호
- **API Key 생성**: 서비스 인증 토큰, 액세스 키
- **Short ID**: URL 단축, 참조 코드, 추적 ID
- **사용자 친화적**: 혼동하기 쉬운 문자 제외로 수동 입력 시 오류 최소화

## 프로젝트 정보
- **패키지명**: `@bboss/uuid32`
- **라이선스**: MIT
- **언어**: TypeScript
- **의존성**: Zero dependency
- **플랫폼**: Node.js 전용 (브라우저 미지원)
- **Node.js 지원**: Node.js 16.0.0+ (crypto.randomUUID() 안정 지원)

## 핵심 기능

### 1. UUID to Base32 변환
- 표준 UUID (36자리, 하이픈 포함)를 Crockford Base32 문자열로 변환
- 예: `49ceabcf-5e02-4449-be28-a9b341df4b08` → `29STNWYQG28H4VWA59PD0XYJR8`

### 2. Base32 to UUID 변환  
- Crockford Base32 문자열을 표준 UUID 형식으로 복원
- 예: `29STNWYQG28H4VWA59PD0XYJR8` → `49ceabcf-5e02-4449-be28-a9b341df4b08`

### 3. Crockford Base32 문자셋
- 사용 문자: `0-9`, `A-Z` (총 32개 문자, I, L, O, U 제외)
- 순서: `0123456789ABCDEFGHJKMNPQRSTVWXYZ`
- 특징: 혼동하기 쉬운 문자 제외 (I/1, L/1, O/0, U/V)
- 장점: Product Key, API Key 등 수동 입력이 필요한 경우 오타 방지

## 기술 요구사항

### API 설계
```typescript
generateBase32(): string              // crypto.randomUUID() + Base32 변환
encode(uuid: string): string          // UUID → Base32
decode(base32: string): string        // Base32 → UUID
isValidBase32(str: string): boolean   // Base32 형식 검증
```

### 사용 예시
```javascript
import uuid32 from '@bboss/uuid32';
// const uuid32 = require('@bboss/uuid32'); // legacy way

// Base32 UUID 생성
const uuid = uuid32.generateBase32();
// → 29STNWYQG28H4VWA59PD0XYJR8 (random)

// Base32를 표준 UUID로 디코딩
const originalUUID = uuid32.decode('29STNWYQG28H4VWA59PD0XYJR8');
// → 49ceabcf-5e02-4449-be28-a9b341df4b08

// 기존 UUID를 Base32로 인코딩
const encoded = uuid32.encode('49ceabcf-5e02-4449-be28-a9b341df4b08');
// → 29STNWYQG28H4VWA59PD0XYJR8

// Base32 형식 검증
const isValidBase32_1 = uuid32.isValidBase32('29STNWYQG28H4VWA59PD0XYJR8');
// → true
const isValidBase32_2 = uuid32.isValidBase32('invalid@base32!');
// → false
```

### 입력 검증
- UUID: encode() 함수에서 내부적으로 검증 (RFC 4122 표준)
- Base32: Crockford Base32 문자셋만 허용
- 잘못된 입력 시 명확한 에러 메시지

### 플랫폼 요구사항
- **Node.js 전용**: 브라우저 환경에서 실행 불가
- **crypto 모듈 의존**: Node.js 내장 crypto.randomUUID() 필수
- **환경 검증**: 브라우저 환경 감지 시 에러 발생

### 성능 요구사항
- **변환 속도**: 10,000회/초 이상 (현재 테스트: 1000회/70ms)
- **메모리 사용량**: 최소화
- **Zero dependency**: 외부 라이브러리 의존성 없음
- **Node.js 내장 API**: crypto.randomUUID() 활용

### 개발 도구
- **테스트**: Jest + ts-jest
- **빌드**: TypeScript 컴파일러
- **커버리지**: Jest 내장 커버리지 도구
- **타입 체크**: TypeScript strict 모드

## 프로젝트 구조
```
@bboss/uuid32/
├── src/
│   ├── index.ts      # 메인 모듈 (generateBase32, encode, decode 등)
│   └── utils.ts      # 유틸리티 함수 (검증 등)
├── test/
│   └── index.test.ts # Jest 테스트 파일
├── dist/             # 컴파일된 JavaScript
│   ├── index.js      # 컴파일된 메인 모듈
│   ├── index.d.ts    # TypeScript 타입 정의
│   ├── utils.js      # 컴파일된 유틸리티
│   └── utils.d.ts    # 유틸리티 타입 정의
├── coverage/         # Jest 커버리지 리포트
├── package.json
├── tsconfig.json
├── jest.config.js    # Jest 설정
├── .gitignore
├── LICENSE           # MIT 라이선스
├── README.md
└── SPEC.md
```

### 빌드 및 배포 구조
- **소스 코드**: `src/` 폴더의 TypeScript 파일
- **빌드 결과**: `dist/` 폴더의 JavaScript + 타입 정의 파일
- **메인 진입점**: `dist/index.js` (CommonJS)
- **타입 정의**: `dist/index.d.ts` (TypeScript 지원)
- **테스트**: Jest를 통한 TypeScript 직접 실행

## 테스트 요구사항
- **테스트 프레임워크**: Jest + ts-jest
- **테스트 파일**: `test/index.test.ts` (단일 파일)
- **커버리지 목표**: 95% 이상 (현재 90.9% 달성)
- **테스트 유형**:
  - 단위 테스트 (각 함수별)
  - 엣지 케이스 테스트 (빈 문자열, 잘못된 입력 등)
  - 성능 테스트 (1000회 연산)
  - 양방향 변환 일관성 테스트
- **실행 방식**: TypeScript 파일 직접 실행 (컴파일 불필요)

## 빌드 및 배포 요구사항

### 빌드 시스템
- **TypeScript 컴파일**: `tsc` 명령어로 단일 빌드
- **출력 형식**: CommonJS (ES Module 지원 제외)
- **타입 정의**: 자동 생성 (.d.ts 파일)
- **소스맵**: 디버깅용 .js.map 파일 포함

### NPM 배포
- **패키지명**: `@bboss/uuid32`
- **라이선스**: MIT
- **메인 파일**: `dist/index.js`
- **타입 파일**: `dist/index.d.ts`
- **Node.js 지원**: 16.0.0+ (crypto.randomUUID() 안정 지원)
- **사용 방식**: `require('@bboss/uuid32')` 또는 `import` 모두 가능

### 환경 제한
- **Node.js 전용**: 브라우저 환경에서 실행 불가
- **환경 검증**: 런타임에서 브라우저 환경 감지 및 에러 처리
- **Zero Dependency**: 외부 라이브러리 의존성 없음