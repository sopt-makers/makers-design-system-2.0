import { useState } from "react";

type Row = {
  semantic: string;
  base: string;
};

type ColorTokenTableProps = {
  title: string;
  rows: Row[];
  leftHeader?: string;
  rightHeader?: string;
  showSwatch?: boolean;
};

const baseColorMap: Record<string, string> = {
  "color.base.gray0": "#FFFFFF", "color.base.gray10": "#FCFCFC",
  "color.base.gray20": "#F6F6F6", "color.base.gray30": "#F0F0F0",
  "color.base.gray50": "#E4E4E5", "color.base.gray100": "#C3C3C6",
  "color.base.gray200": "#9D9DA4", "color.base.gray300": "#808087",
  "color.base.gray400": "#66666D", "color.base.gray500": "#515159",
  "color.base.gray600": "#3F3F47", "color.base.gray700": "#2E2E35",
  "color.base.gray800": "#202025", "color.base.gray900": "#17181C",
  "color.base.gray950": "#0F1012",
  "color.base.orange50": "#FFECE5", "color.base.orange100": "#FFCEBD",
  "color.base.orange200": "#FFA480", "color.base.orange300": "#FF834A",
  "color.base.orange400": "#F77234", "color.base.orange500": "#D4591C",
  "color.base.orange600": "#AD4E17", "color.base.orange700": "#853D11",
  "color.base.orange800": "#5C2B0C", "color.base.orange900": "#422109",
  "color.base.orange950": "#2C1D18",
  "color.base.blue50": "#C8E1FF", "color.base.blue100": "#8FC0FF",
  "color.base.blue200": "#619EFF", "color.base.blue300": "#4485FF",
  "color.base.blue400": "#346FFA", "color.base.blue500": "#2C53DF",
  "color.base.blue600": "#2649B3", "color.base.blue700": "#253B8C",
  "color.base.blue800": "#23306A", "color.base.blue900": "#20274D",
  "color.base.blue950": "#121A2B",
  "color.base.red50": "#FFD1D3", "color.base.red100": "#FFA8AD",
  "color.base.red200": "#FF818B", "color.base.red300": "#FA616D",
  "color.base.red400": "#F04251", "color.base.red500": "#CA2F3D",
  "color.base.red600": "#9E2733", "color.base.red700": "#7A242D",
  "color.base.red800": "#562025", "color.base.red900": "#3C2020",
  "color.base.red950": "#2B191D",
  "color.base.green50": "#CCFFEC", "color.base.green100": "#82F6CB",
  "color.base.green200": "#4EE4AD", "color.base.green300": "#26CF91",
  "color.base.green400": "#16BF81", "color.base.green500": "#13A06C",
  "color.base.green600": "#138A5E", "color.base.green700": "#136D4C",
  "color.base.green800": "#13533C", "color.base.green900": "#15372B",
  "color.base.green950": "#182926",
  "color.base.yellow50": "#FFF4D4", "color.base.yellow100": "#FFE9B2",
  "color.base.yellow200": "#FFDE8A", "color.base.yellow300": "#FFCD59",
  "color.base.yellow400": "#FFC234", "color.base.yellow500": "#FFB326",
  "color.base.yellow600": "#EBA01E", "color.base.yellow700": "#B57B1D",
  "color.base.yellow800": "#72531E", "color.base.yellow900": "#534123",
  "color.base.yellow950": "#312A1E",
};

function resolveHex(baseToken: string): string {
  return baseColorMap[baseToken] ?? baseToken;
}

function CopyableCell({ text, color }: { text: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <span
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontSize: "16px",
        color,
        cursor: "pointer",
        opacity: pressed ? 0.8 : hovered ? 0.8 : 1,
        transition: "opacity 100ms ease",
        userSelect: "none",
      }}
    >
      {text}
    </span>
  );
}

export function ColorTokenTable({
  title,
  rows,
  leftHeader = "Semantic Token",
  rightHeader = "Base Token",
  showSwatch = true,
}: ColorTokenTableProps) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <p style={{ fontSize: "18px", fontWeight: 500, color: "#C3C3C6", margin: "0 0 16px 0" }}>
        {title}
      </p>
      <div style={{
        border: "1px solid #2E2E35",
        borderRadius: "8px",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr",
      }}>
        <div style={{ backgroundColor: "#202025", padding: "10px 16px", borderBottom: "1px solid #2E2E35" }}>
          <span style={{ fontSize: "16px", color: "#FCFCFC" }}>{leftHeader}</span>
        </div>
        <div style={{ backgroundColor: "#2E2E35" }} />
        <div style={{ backgroundColor: "#202025", padding: "10px 16px", borderBottom: "1px solid #2E2E35" }}>
          <span style={{ fontSize: "16px", color: "#FCFCFC" }}>{rightHeader}</span>
        </div>

        {rows.map((row, i) => {
          const hex = resolveHex(row.base);
          const borderBottom = i < rows.length - 1 ? "1px solid #2E2E35" : "none";
          return (
            <>
              <div
                key={`semantic-${row.semantic}`}
                style={{ padding: "12px 16px", backgroundColor: "#17181C", borderBottom, display: "flex", alignItems: "center" }}
              >
                <CopyableCell text={row.semantic} color="#FCFCFC" />
              </div>
              <div style={{ backgroundColor: "#2E2E35" }} />
              <div
                key={`base-${row.semantic}`}
                style={{ padding: "12px 16px", backgroundColor: "#17181C", borderBottom, display: "flex", alignItems: "center", gap: "8px" }}
              >
                {showSwatch && (
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: hex, border: "1px solid #3F3F47", flexShrink: 0 }} />
                )}
                <CopyableCell text={row.base} color="#FCFCFC" />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}