import type { Meta, StoryObj } from "@storybook/react";
import { typography } from "./typography";

function TypographyScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {Object.entries(typography).map(([name, style]) => (
        <div key={name}>
          <div style={{ color: "#6b7684", fontSize: 12, marginBottom: 4 }}>
            {name} — {style.fontSize} / {style.lineHeight} / {style.fontWeight}
          </div>
          <div style={style}>다람쥐 헌 쳇바퀴에 타고파</div>
        </div>
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
