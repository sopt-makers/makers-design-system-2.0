import type { Meta, StoryObj } from "@storybook/react";
import { radiusBase } from "./base";

function RadiusScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.entries(radiusBase).map(([token, value]) => (
        <div
          key={token}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ width: 80, fontFamily: "monospace" }}>{token}</div>
          <div
            style={{
              width: 48,
              height: 48,
              background: "#346FFA",
              borderRadius: value,
            }}
          />
          <div style={{ color: "#808087" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof RadiusScale> = {
  title: "Token/Radius",
  component: RadiusScale,
  parameters: { layout: "padded" },
};

export default meta;

export const Scale: StoryObj<typeof RadiusScale> = {};
