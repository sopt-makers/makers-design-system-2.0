export const space = {
  "0": "0px",
  "1": "2px",
  "2": "4px",
  "3": "8px",
  "4": "12px",
  "5": "16px",
  "6": "20px",
  "7": "24px",
  "8": "32px",
  "9": "40px",
  "10": "48px",
} as const;

export type Space = keyof typeof space;
