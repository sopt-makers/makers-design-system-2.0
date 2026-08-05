# Token Update Spec

에이전트가 Figma `token.json`을 해석한 뒤 스크립트에 넘기는 **정규화 명세** 형식이다.

경로(기본): `.sync-design-tokens/update-spec.json`  
실행: `pnpm tokens:sync -- --spec .sync-design-tokens/update-spec.json`

## 원칙

- 명세에 **포함된 섹션만** 해당 TS 파일을 **통째로 교체**한다. (SSOT)
- 명세에 없는 섹션의 파일은 수정하지 않는다.
- 값에는 Figma `$type` / `$value` / DTCG path를 넣지 않는다. **이미 해석된 키·값**만 넣는다.

## 스키마

```ts
type TokenUpdateSpec = {
  baseColor?: Record<Family, Record<Scale, string>>;
  semanticColor?: Record<Group, Record<Category, Record<Leaf, ColorValue>>>;
  spacing?: Record<string, string>;
  typographyBase?: Record<Group, Record<string, string | number>>;
  semanticTypography?: Record<StyleName, {
    fontWeight: TypographyBaseRef;
    fontSize: TypographyBaseRef;
    lineHeight: TypographyBaseRef;
    letterSpacing: TypographyBaseRef;
  }>;
  radius?: Record<string, string>;
};

type ColorValue = string | { kind: "baseColor"; key: string };
type TypographyBaseRef = {
  kind: "typographyBase";
  group: "weight" | "size" | "lineHeight" | "letterSpacing";
  key: string;
};
```

## 섹션별 예시

### baseColor

Figma `base.color.base.gray.10` → family `gray`, scale `10`

```json
{
  "baseColor": {
    "blue": { "50": "#C8E1FF", "100": "#8FC0FF" },
    "gray": { "0": "#FFFFFF", "10": "#FCFCFC", "200": "#9D9DA4" }
  }
}
```

스크립트가 family 알파벳순·scale 숫자순으로 `gray10` 형태의 flat export를 작성한다.

### semanticColor

```json
{
  "semanticColor": {
    "fg": {
      "neutral": {
        "bold": { "kind": "baseColor", "key": "gray10" },
        "default": { "kind": "baseColor", "key": "gray100" }
      }
    },
    "bg": {
      "dim": {
        "default": "rgba(15, 16, 18, 0.8)"
      }
    }
  }
}
```

- group 키: `fg` / `bg` / `stroke` (payload 등장 순서 유지)
- leaf 키: 이미 camelCase (`defaultHover`)
- alias는 `{ kind: "baseColor", key: "gray10" }`

### spacing / radius

```json
{
  "spacing": { "s0": "0px", "s2": "2px", "s4": "4px" },
  "radius": { "r0": "0px", "r8": "8px", "full": "9999px" }
}
```

### typographyBase

```json
{
  "typographyBase": {
    "weight": { "bold": 700, "semibold": 600, "regular": 400 },
    "size": { "t12": "12px", "t14": "14px" },
    "lineHeight": { "t16": "16px", "t18": "18px" },
    "letterSpacing": { "wide": "-0.015em", "default": "-0.02em" }
  }
}
```

- size/lineHeight 키는 이미 `t12` 형태
- letterSpacing은 이미 `em` 단위

### semanticTypography

```json
{
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

## 에이전트 → 스크립트 역할

| 담당 | 내용 |
|---|---|
| 에이전트 | Figma JSON walk, alias 해석, kebab→camel, `%`→`em`, 키 네이밍, 섹션 구성, 순서 결정 |
| 스크립트 | 명세 검증, 결정적 TS 직렬화(정렬 가드 포함), 파일 쓰기 |

## 최소 유효 명세

섹션을 하나 이상 포함해야 한다. 빈 `{}`는 에러.
