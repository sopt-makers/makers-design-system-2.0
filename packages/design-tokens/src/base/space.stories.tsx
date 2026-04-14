import type { Meta, StoryObj } from "@storybook/react";
import { space } from "./space";

function SpaceScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Object.entries(space).map(([token, value]) => (
        <div
          key={token}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ width: 48, fontFamily: "monospace" }}>{token}</div>
          <div style={{ background: "#3182f6", height: 16, width: value }} />
          <div style={{ color: "#6b7684" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof SpaceScale> = {
  title: "Base/Space",
  component: SpaceScale,
  parameters: { layout: "padded" },
};

export default meta;

export const Scale: StoryObj<typeof SpaceScale> = {};
