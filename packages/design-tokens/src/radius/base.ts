export const radiusBase = {
  r0: "0px",
  r2: "2px",
  r4: "4px",
  r6: "6px",
  r8: "8px",
  r10: "10px",
  r12: "12px",
  r14: "14px",
  r16: "16px",
  r20: "20px",
  r24: "24px",
  r32: "32px",
  full: "9999px",
} as const;

export type RadiusToken = keyof typeof radiusBase;
