import type { Meta, StoryObj } from "@storybook/react";
import { baseColor } from "./color";

interface SwatchProps {
  name: string;
  value: string;
}

function Swatch({ name, value }: SwatchProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 8 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          background: value,
          border: "1px solid #e5e8eb",
        }}
      />
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ fontFamily: "monospace", color: "#6b7684" }}>{value}</div>
      </div>
    </div>
  );
}

function ColorGrid() {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}
    >
      {Object.entries(baseColor).map(([name, value]) => (
        <Swatch key={name} name={name} value={value} />
      ))}
    </div>
  );
}

const meta: Meta<typeof ColorGrid> = {
  title: "Base/Color",
  component: ColorGrid,
  parameters: { layout: "padded" },
};

export default meta;

export const Palette: StoryObj<typeof ColorGrid> = {};
