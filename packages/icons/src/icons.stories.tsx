import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties, ComponentType, SVGProps } from "react";
import * as IconsModule from ".";
import type { IconCategory } from "./_meta/icon-map";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type CategoryMap = Record<string, IconComponent>;

const categoryNames: IconCategory[] = [
  "Communication",
  "Editor",
  "Feedback",
  "Files",
  "General",
  "Interaction",
  "Logo",
  "Media",
  "Time",
  "Users",
];

const categories: Record<IconCategory, CategoryMap> = {
  Communication: IconsModule.Communication as CategoryMap,
  Editor: IconsModule.Editor as CategoryMap,
  Feedback: IconsModule.Feedback as CategoryMap,
  Files: IconsModule.Files as CategoryMap,
  General: IconsModule.General as CategoryMap,
  Interaction: IconsModule.Interaction as CategoryMap,
  Logo: IconsModule.Logo as CategoryMap,
  Media: IconsModule.Media as CategoryMap,
  Time: IconsModule.Time as CategoryMap,
  Users: IconsModule.Users as CategoryMap,
};

interface CatalogProps {
  size: number;
  color: string;
  category: IconCategory | "all";
  search: string;
}

interface IconCardProps {
  name: string;
  Icon: IconComponent;
  size: number;
  color: string;
}

function IconCard({ name, Icon, size, color }: IconCardProps) {
  const iconStyle: CSSProperties = { width: size, height: size, flexShrink: 0 };
  if (color?.trim()) {
    iconStyle.color = color;
  }

  return (
    <button
      type="button"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: 16,
        border: "1px solid var(--color-border, #e5e7eb)",
        borderRadius: 10,
        background: "var(--color-surface, #f9fafb)",
        color: "inherit",
        cursor: "pointer",
        font: "inherit",
        transition: "border-color 120ms ease",
      }}
      onClick={() => {
        navigator.clipboard?.writeText(name).catch(() => {});
      }}
      title={`Copy "${name}" to clipboard`}
    >
      <Icon style={iconStyle} />
      <span
        style={{
          fontSize: 11,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          textAlign: "center",
          wordBreak: "break-word",
          lineHeight: 1.35,
          color: "var(--color-foreground-muted, #6b7280)",
        }}
      >
        {name}
      </span>
    </button>
  );
}

interface CategorySectionProps {
  name: IconCategory;
  icons: CategoryMap;
  size: number;
  color: string;
  search: string;
}

function CategorySection({ name, icons, size, color, search }: CategorySectionProps) {
  const needle = search.trim().toLowerCase();
  const entries = Object.entries(icons).filter(([key]) =>
    needle ? key.toLowerCase().includes(needle) : true,
  );
  if (entries.length === 0) return null;

  return (
    <section style={{ marginBottom: 40 }}>
      <header
        style={{
          marginBottom: 16,
          paddingBottom: 8,
          borderBottom: "1px solid var(--color-border, #e5e7eb)",
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
          {name}{" "}
          <span
            style={{
              color: "var(--color-foreground-muted, #9ca3af)",
              fontWeight: 400,
              fontSize: 14,
            }}
          >
            ({entries.length})
          </span>
        </h2>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 8,
        }}
      >
        {entries.map(([key, Icon]) => (
          <IconCard key={key} name={key} Icon={Icon} size={size} color={color} />
        ))}
      </div>
    </section>
  );
}

function IconCatalog({ size, color, category, search }: CatalogProps) {
  const visible = category === "all" ? categoryNames : [category];
  const totalShown = visible.reduce((acc, name) => {
    const needle = search.trim().toLowerCase();
    const count = Object.keys(categories[name]).filter((k) =>
      needle ? k.toLowerCase().includes(needle) : true,
    ).length;
    return acc + count;
  }, 0);

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          marginBottom: 24,
          padding: "12px 16px",
          background: "var(--color-surface, #f9fafb)",
          border: "1px solid var(--color-border, #e5e7eb)",
          borderRadius: 8,
          fontSize: 13,
        }}
      >
        <strong>{totalShown}</strong> icon{totalShown === 1 ? "" : "s"} shown · 카드 클릭 시 컴포넌트 이름이
        클립보드에 복사됩니다.
      </div>
      {visible.map((name) => (
        <CategorySection
          key={name}
          name={name}
          icons={categories[name]}
          size={size}
          color={color}
          search={search}
        />
      ))}
    </div>
  );
}

const meta: Meta<typeof IconCatalog> = {
  title: "Catalog",
  component: IconCatalog,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "전체 아이콘 카탈로그. 카테고리 선택, 사이즈 조절, 색상 오버라이드, 이름 검색 지원. " +
          "기본 색상은 상단 테마 토글(light/dark)을 상속하며, color 컨트롤에 값을 넣으면 임시 오버라이드됩니다. " +
          "다색 Logo(googleColor, github)는 디자인 그대로 보존되어 테마/오버라이드 무시.",
      },
    },
  },
  argTypes: {
    size: { control: { type: "range", min: 12, max: 64, step: 2 } },
    color: {
      control: "color",
      description: "비워두면 테마 색상 상속, 값을 지정하면 그 색으로 오버라이드",
    },
    category: {
      control: "select",
      options: ["all", ...categoryNames],
    },
    search: { control: "text" },
  },
  args: {
    size: 24,
    color: "",
    category: "all",
    search: "",
  },
};

export default meta;

type Story = StoryObj<typeof IconCatalog>;

export const All: Story = { args: { category: "all" } };
export const CommunicationCategory: Story = {
  name: "Communication",
  args: { category: "Communication" },
};
export const EditorCategory: Story = { name: "Editor", args: { category: "Editor" } };
export const FeedbackCategory: Story = { name: "Feedback", args: { category: "Feedback" } };
export const FilesCategory: Story = { name: "Files", args: { category: "Files" } };
export const GeneralCategory: Story = { name: "General", args: { category: "General" } };
export const InteractionCategory: Story = {
  name: "Interaction",
  args: { category: "Interaction" },
};
export const LogoCategory: Story = { name: "Logo", args: { category: "Logo" } };
export const MediaCategory: Story = { name: "Media", args: { category: "Media" } };
export const TimeCategory: Story = { name: "Time", args: { category: "Time" } };
export const UsersCategory: Story = { name: "Users", args: { category: "Users" } };
