import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  typographyHeading,
  typographyTitle,
  typographyBody,
  typographyLabel,
} from "../semantic/typography";

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

const categories = [
  { name: "heading", scales: typographyHeading },
  { name: "title", scales: typographyTitle },
  { name: "body", scales: typographyBody },
  { name: "label", scales: typographyLabel },
] as const;

function TypographyScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      {categories.map(({ name, scales }) =>
        (Object.entries(scales) as [string, TypographyStyle][]).map(([level, style]) => (
          <TypographyRow key={`${name}-${level}`} name={`typography.${name}.${level}`} style={style} />
        ))
      )}
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
