import type { Meta, StoryObj } from "@storybook/react";
import { baseColor } from "./base";
import { colorBg, colorFg, colorStroke } from "./semantic";

type SwatchKind = "fill" | "stroke";

interface ColorEntry {
  name: string;
  value: string;
}

interface ColorGroup {
  title: string;
  kind?: SwatchKind;
  entries: ColorEntry[];
}

interface SwatchProps {
  name: string;
  value: string;
  kind: SwatchKind;
}

function Swatch({ name, value, kind }: SwatchProps) {
  const previewBase = {
    width: 48,
    height: 48,
    borderRadius: 8,
    flexShrink: 0,
  } as const;

  const preview =
    kind === "stroke"
      ? { ...previewBase, border: `2px solid ${value}` }
      : {
          ...previewBase,
          background: value,
          border: "1px solid rgba(0,0,0,0.1)",
        };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 8 }}>
      <div style={preview} />
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ fontFamily: "monospace", color: "#808087" }}>{value}</div>
      </div>
    </div>
  );
}

interface ColorGridProps {
  groups: ColorGroup[];
}

function ColorGrid({ groups }: ColorGridProps) {
  return (
    <div style={{ padding: 16 }}>
      {groups.map(({ title, kind = "fill", entries }) => (
        <div key={title} style={{ marginBottom: 24 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 8,
              textTransform: "capitalize",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 8,
            }}
          >
            {entries.map(({ name, value }) => (
              <Swatch key={name} name={name} value={value} kind={kind} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const palettes = ["gray", "orange", "blue", "red", "green", "yellow"] as const;

const baseGroups: ColorGroup[] = palettes.map((palette) => ({
  title: palette,
  entries: Object.entries(baseColor)
    .filter(([key]) => key.startsWith(palette))
    .map(([name, value]) => ({ name, value })),
}));

function flattenSemantic(
  group: Readonly<Record<string, Readonly<Record<string, string>>>>,
): ColorEntry[] {
  return Object.entries(group).flatMap(([role, variants]) =>
    Object.entries(variants).map(([variant, value]) => ({
      name: `${role}.${variant}`,
      value,
    })),
  );
}

const semanticGroups: ColorGroup[] = [
  { title: "Foreground", kind: "fill", entries: flattenSemantic(colorFg) },
  { title: "Background", kind: "fill", entries: flattenSemantic(colorBg) },
  { title: "Stroke", kind: "stroke", entries: flattenSemantic(colorStroke) },
];

const meta: Meta<typeof ColorGrid> = {
  title: "Token/Color",
  component: ColorGrid,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof ColorGrid>;

export const Palette: Story = {
  args: { groups: baseGroups },
};

export const Semantic: Story = {
  args: { groups: semanticGroups },
};
