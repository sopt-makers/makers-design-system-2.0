export const typography = {
  h1: { fontSize: "32px", lineHeight: "40px", fontWeight: 700 },
  h2: { fontSize: "24px", lineHeight: "32px", fontWeight: 700 },
  h3: { fontSize: "20px", lineHeight: "28px", fontWeight: 600 },
  body: { fontSize: "16px", lineHeight: "24px", fontWeight: 400 },
  caption: { fontSize: "13px", lineHeight: "18px", fontWeight: 400 },
} as const;

export type TypographyToken = keyof typeof typography;
