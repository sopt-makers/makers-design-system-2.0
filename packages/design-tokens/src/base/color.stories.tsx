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
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      />
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ fontFamily: "monospace", color: "#808087" }}>{value}</div>
      </div>
    </div>
  );
}

const palettes = ["gray", "orange", "blue", "red", "green", "yellow"] as const;

function groupByPalette() {
  return palettes.map((palette) => {
    const entries = Object.entries(baseColor).filter(([key]) => key.startsWith(palette));
    return { palette, entries };
  });
}

function ColorGrid() {
  return (
    <div style={{ padding: 16 }}>
      {groupByPalette().map(({ palette, entries }) => (
        <div key={palette} style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, textTransform: "capitalize" }}>
            {palette}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {entries.map(([name, value]) => (
              <Swatch key={name} name={name} value={value} />
            ))}
          </div>
        </div>
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
