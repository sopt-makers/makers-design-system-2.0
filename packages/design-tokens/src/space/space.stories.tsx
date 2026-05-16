import type { Meta, StoryObj } from "@storybook/react";
import { spacingBase } from "./base";

function SpaceScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Object.entries(spacingBase).map(([token, value]) => (
        <div
          key={token}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ width: 80, fontFamily: "monospace" }}>{token}</div>
          <div style={{ background: "#346FFA", height: 16, width: value }} />
          <div style={{ color: "#808087" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof SpaceScale> = {
  title: "Token/Space",
  component: SpaceScale,
  parameters: { layout: "padded" },
};

export default meta;

export const Scale: StoryObj<typeof SpaceScale> = {};
