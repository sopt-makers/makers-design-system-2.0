import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { semanticTypography } from "../semantic/typography";

interface TypographyStyle {
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

function TypographyRow({ name, style }: { name: string; style: TypographyStyle }) {
  const cssStyle: CSSProperties = {
    fontWeight: style.fontWeight,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  };

  return (
    <div style={{ paddingBottom: 16, borderBottom: "1px solid #2E2E35" }}>
      <div style={{ color: "#808087", fontSize: 12, marginBottom: 4, fontFamily: "monospace" }}>
        {name} — {style.fontSize} / {style.lineHeight} / fw {style.fontWeight} / ls {style.letterSpacing}
      </div>
      <div style={cssStyle}>다람쥐 헌 쳇바퀴에 타고파</div>
    </div>
  );
}

function TypographyScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      {(Object.entries(semanticTypography) as [string, TypographyStyle][]).map(([name, style]) => (
        <TypographyRow key={name} name={`typography.${name}`} style={style} />
      ))}
    </div>
  );
}

const meta: Meta<typeof TypographyScale> = {
  title: "Base/Typography",
  component: TypographyScale,
  parameters: { layout: "padded" },
};

export default meta;

export const Scale: StoryObj<typeof TypographyScale> = {};
