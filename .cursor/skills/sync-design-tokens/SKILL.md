---
name: sync-design-tokens
description: >-
  Syncs Figma design-token JSON into @sopt-mds/design-tokens by extracting a
  normalized update-spec, applying it with pnpm tokens:sync, then reviewing
  input vs output. Use when token.json arrives, or when asked to sync/update
  design tokens from Figma.
---

# Sync Design Tokens

Figma `token.json`을 **SSOT**로 삼아 `packages/design-tokens/src`를 갱신한다.

역할 분리:

| 담당 | 역할 |
|---|---|
| **에이전트** | Figma JSON을 읽고 **정규화 update-spec**(키/값)을 작성 |
| **스크립트** | update-spec을 받아 TS 파일을 **결정적으로** 기록 |
| **에이전트** | Figma input ↔ update-spec ↔ TS output **전수 검토** |

스크립트는 Figma DTCG를 해석하지 않는다. 해석·네이밍·alias 변환은 에이전트 몫이다.

## When to Use

- `repository_dispatch` / CI에서 `token.json`이 주어졌을 때
- Figma 토큰 동기화 / design tokens 업데이트 요청

## 실행 순서 (필수)

### 1. 입력 확인

1. 루트 `token.json` 존재 확인. 없으면 중단.
2. `base` / `semantic` 존재와 섹션 목록 파악  
   (`color`, `spacing`, `typography`, `radius` 등)

### 2. update-spec 작성 (에이전트)

Figma payload를 [references/mapping.md](references/mapping.md) 규칙으로 해석해  
`.sync-design-tokens/update-spec.json`을 작성한다.

스키마·예시는 다음을 따른다.

- [references/mapping.md](references/mapping.md) — Figma → spec 변환
- `scripts/src/sync-design-tokens/references/update-spec.md` — spec JSON 스키마

포함 섹션만 넣는다. 예:

```json
{
  "baseColor": { "gray": { "0": "#FFFFFF", "10": "#FCFCFC" } },
  "semanticColor": {
    "fg": {
      "neutral": {
        "bold": { "kind": "baseColor", "key": "gray10" }
      }
    }
  },
  "spacing": { "s0": "0px", "s4": "4px" },
  "radius": { "r0": "0px", "full": "9999px" },
  "typographyBase": {
    "weight": { "bold": 700, "regular": 400 },
    "size": { "t12": "12px" },
    "lineHeight": { "t16": "16px" },
    "letterSpacing": { "default": "-0.02em" }
  },
  "semanticTypography": {
    "heading1": {
      "fontWeight": { "kind": "typographyBase", "group": "weight", "key": "bold" },
      "fontSize": { "kind": "typographyBase", "group": "size", "key": "t32" },
      "lineHeight": { "kind": "typographyBase", "group": "lineHeight", "key": "t48" },
      "letterSpacing": { "kind": "typographyBase", "group": "letterSpacing", "key": "default" }
    }
  }
}
```

작성 전 `.sync-design-tokens/` 디렉터리가 없으면 생성한다.

### 3. 스크립트로 적용

```bash
pnpm tokens:sync -- --spec .sync-design-tokens/update-spec.json
```

- 구현: `scripts/src/sync-design-tokens/index.ts` (+ `format/`, `utils/`)
- 명세에 있는 섹션의 TS 파일만 통째로 교체 (SSOT)

실패 시 명세/스크립트를 고치고 재실행한다. 출력만 일회성 패치하지 않는다.

### 4. typecheck

```bash
pnpm --filter @sopt-mds/design-tokens typecheck
```

### 5. 전수 검토 (에이전트)

세 층을 모두 대조한다.

1. **Figma `token.json` ↔ update-spec**  
   - 섹션·키 누락/과다  
   - alias·단위·camelCase 변환 오류  
   - SSOT: payload에 없는 키가 spec에 남아 있지 않은지
2. **update-spec ↔ TS output**  
   - 스크립트가 명세 키를 빠뜨리거나 잘못 직렬화하지 않았는지  
   - family 알파벳순 / 번호 키 숫자순 등 정렬 가드  
   - `baseColor.gray10`, `typographyWeight.bold` 참조 표기
3. **포맷**  
   - `as const`, type export, semantic import 경로

문제 유형별 조치:

| 원인 | 조치 |
|---|---|
| 명세 오해석 | update-spec 수정 → step 3 재실행 |
| 스크립트 버그 | `scripts/src/sync-design-tokens` 수정 → step 3 재실행 |
| 출력만 수동 수정 | **금지** (다음 sync에서 회귀) |

### 6. 결과 보고

- 변경 파일
- 추가/수정/삭제 키 요지
- 전수 검토에서 고친 이슈

## update-spec 작성 규칙

상세 매핑: [references/mapping.md](references/mapping.md)

### 값

- color alias → `{ "kind": "baseColor", "key": "gray10" }`
- typography alias → `{ "kind": "typographyBase", "group": "size", "key": "t32" }`
- hex/rgba → 문자열
- letterSpacing `%` → 이미 `em`으로 변환해 넣기
- leaf 키는 이미 camelCase / `t12` / `heading1` 형태

### 순서 (spec object 키 순서에 반영)

1. 기본: Figma payload 등장 순서
2. 번호 시리즈: 숫자 오름차순 우선
3. `baseColor` family: 알파벳 오름차순 (스크립트도 한 번 더 정렬)

### SSOT

- Figma에 없는 키는 spec에 넣지 않는다 → 해당 파일에서 삭제됨
- Figma에 없는 섹션은 spec에서 키 자체를 생략 → 파일 미수정

## 출력 파일

| update-spec 키 | 출력 |
|---|---|
| `baseColor` | `color/base.ts` |
| `semanticColor` | `color/semantic.ts` |
| `spacing` | `space/base.ts` |
| `typographyBase` | `typography/base.ts` |
| `semanticTypography` | `typography/semantic.ts` |
| `radius` | `radius/base.ts` |

## 스크립트 구조

```
scripts/src/sync-design-tokens/
  index.ts      # spec 읽기 → format → write
  types.ts      # TokenUpdateSpec
  format/       # TS 문자열 생성 (결정적)
  utils/        # file, order, …
```

Figma 파싱용 `parse/`·`build/`가 남아 있어도 **이 스킬 경로에서는 사용하지 않는다.**  
(에이전트가 명세를 만드는 것이 SSOT 해석의 단일 경로)

## 하지 말 것

- Figma JSON을 스크립트에 직접 넘기기
- 전수 검토 생략
- payload에 없는 키를 spec에 되살리기
- 스크립트 실패를 TS 일회성 패치로만 덮기
- `packages/ui` 등 소비처를 이 스킬에서 함께 리팩터하기
