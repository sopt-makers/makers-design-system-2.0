import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties, ReactNode } from "react";
import {
  typographyLetterSpacing,
  typographyLineHeight,
  typographySize,
  typographyWeight,
} from "./base";
import { semanticTypography } from "./semantic";

interface TypographyStyle {
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 12,
          textTransform: "capitalize",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

function TokenRow({
  name,
  value,
  preview,
}: {
  name: string;
  value: string | number;
  preview: ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(280px, max-content) 96px 1fr",
        alignItems: "center",
        columnGap: 16,
        paddingBottom: 12,
        borderBottom: "1px solid #2E2E35",
      }}
    >
      <div style={{ fontFamily: "monospace", whiteSpace: "nowrap" }}>{name}</div>
      <div
        style={{
          color: "#808087",
          fontFamily: "monospace",
          fontSize: 12,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
      <div style={{ minWidth: 0 }}>{preview}</div>
    </div>
  );
}

function TypographyRow({
  name,
  style,
}: {
  name: string;
  style: TypographyStyle;
}) {
  const cssStyle: CSSProperties = {
    fontWeight: style.fontWeight,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  };

  return (
    <div style={{ paddingBottom: 16, borderBottom: "1px solid #2E2E35" }}>
      <div
        style={{
          color: "#808087",
          fontSize: 12,
          marginBottom: 4,
          fontFamily: "monospace",
        }}
      >
        {name} — {style.fontSize} / {style.lineHeight} / fw {style.fontWeight} /
        ls {style.letterSpacing}
      </div>
      <div style={cssStyle}>다람쥐 헌 쳇바퀴에 타고파</div>
    </div>
  );
}

function TypographyBase() {
  return (
    <div style={{ padding: 16 }}>
      <Section title="Weight">
        {(
          Object.entries(typographyWeight) as [string, number][]
        ).map(([token, value]) => (
          <TokenRow
            key={token}
            name={`typographyWeight.${token}`}
            value={value}
            preview={
              <div style={{ fontWeight: value, fontSize: 18 }}>
                다람쥐 헌 쳇바퀴에 타고파
              </div>
            }
          />
        ))}
      </Section>

      <Section title="Size">
        {(Object.entries(typographySize) as [string, string][]).map(
          ([token, value]) => (
            <TokenRow
              key={token}
              name={`typographySize.${token}`}
              value={value}
              preview={
                <div style={{ fontSize: value, lineHeight: 1.2 }}>
                  다람쥐 헌 쳇바퀴에 타고파
                </div>
              }
            />
          ),
        )}
      </Section>

      <Section title="Line Height">
        {(Object.entries(typographyLineHeight) as [string, string][]).map(
          ([token, value]) => (
            <TokenRow
              key={token}
              name={`typographyLineHeight.${token}`}
              value={value}
              preview={
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: value,
                    background: "rgba(52, 111, 250, 0.12)",
                    borderLeft: "2px solid #346FFA",
                    paddingLeft: 8,
                  }}
                >
                  다람쥐 헌 쳇바퀴에 타고파
                  <br />
                  The quick brown fox jumps over the lazy dog
                </div>
              }
            />
          ),
        )}
      </Section>

      <Section title="Letter Spacing">
        {(
          Object.entries(typographyLetterSpacing) as [string, string][]
        ).map(([token, value]) => (
          <TokenRow
            key={token}
            name={`typographyLetterSpacing.${token}`}
            value={value}
            preview={
              <div style={{ fontSize: 18, letterSpacing: value }}>
                다람쥐 헌 쳇바퀴에 타고파
              </div>
            }
          />
        ))}
      </Section>
    </div>
  );
}

function TypographySemantic() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}
    >
      {(Object.entries(semanticTypography) as [string, TypographyStyle][]).map(
        ([name, style]) => (
          <TypographyRow key={name} name={`typography.${name}`} style={style} />
        ),
      )}
    </div>
  );
}

const meta: Meta = {
  title: "Token/Typography",
  parameters: { layout: "padded" },
};

export default meta;

export const Base: StoryObj = {
  render: () => <TypographyBase />,
};

export const Semantic: StoryObj = {
  render: () => <TypographySemantic />,
};
