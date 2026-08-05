import { createBrowserRouter, Navigate } from "react-router-dom";
import { DocsLayout } from "../layouts/DocsLayout";
import { HomePage } from "../pages/HomePage";
import { NotReadyPage } from "../pages/NotReadyPage";

// Overview
import DesignTokens from "../content/foundations/design-tokens.mdx";

// Foundations
import ColorSystem from "../content/foundations/color-system.mdx";
import ColorTokenReference from "../content/foundations/color-token-reference.mdx";
import TypographySystem from "../content/foundations/typography-system.mdx";
import RadiusSystem from "../content/foundations/radius-system.mdx";
import RadiusTokenReference from "../content/foundations/radius-token-reference.mdx";
import SpacingSystem from "../content/foundations/spacing-system.mdx";
import SpacingTokenReference from "../content/foundations/spacing-token-reference.mdx";
import ToneOfVoice from "../content/foundations/tone-of-voice.mdx";
import WritingPrinciples from "../content/foundations/writing-principles.mdx";
import Language from "../content/foundations/language.mdx";
import Grammar from "../content/foundations/grammar.mdx";

// Developments
import MigrationReference from "../content/foundations/migration-reference.mdx";

// 메뉴에서 빠진 문서 — 새 구조에 자리가 없지만 내용이 다른 문서로 흡수될지 정해지지 않아
// 경로만 살려둔다. 사이드바에는 노출되지 않고 직접 URL로만 닿는다.
import SemanticColor from "../content/foundations/semantic-color.mdx";
import Typography from "../content/foundations/typography.mdx";
import Spacing from "../content/foundations/spacing.mdx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DocsLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // Overview
      {
        path: "overview",
        element: <Navigate to="/overview/design-token" replace />,
      },
      { path: "overview/design-token", element: <DesignTokens /> },

      // Foundations
      {
        path: "foundations",
        element: <Navigate to="/foundations/color-system" replace />,
      },

      // Colors
      { path: "foundations/color-system", element: <ColorSystem /> },
      {
        path: "foundations/color-token-reference",
        element: <ColorTokenReference />,
      },

      // Typography
      { path: "foundations/typography-system", element: <TypographySystem /> },

      // Radius
      { path: "foundations/radius-system", element: <RadiusSystem /> },
      {
        path: "foundations/radius-token-reference",
        element: <RadiusTokenReference />,
      },

      // Spacing
      { path: "foundations/spacing-system", element: <SpacingSystem /> },
      {
        path: "foundations/spacing-token-reference",
        element: <SpacingTokenReference />,
      },

      // UX Writing
      { path: "foundations/tone-of-voice", element: <ToneOfVoice /> },
      { path: "foundations/writing-principles", element: <WritingPrinciples /> },
      { path: "foundations/language", element: <Language /> },
      { path: "foundations/grammar", element: <Grammar /> },

      // Components — 아직 문서가 없어 전부 NotReadyPage로 떨어진다.
      {
        path: "components",
        element: <Navigate to="/components/avatar" replace />,
      },

      // Developments
      {
        path: "developments",
        element: <Navigate to="/developments/migration" replace />,
      },
      { path: "developments/migration", element: <MigrationReference /> },

      // 메뉴에서 빠진 문서
      { path: "foundations/semantic-color", element: <SemanticColor /> },
      { path: "foundations/typography", element: <Typography /> },
      { path: "foundations/spacing", element: <Spacing /> },

      // 탭 개편으로 옮겨간 경로 — 기존 링크가 죽지 않게 새 위치로 보낸다.
      // SPA라 서버 301이 아니라 히스토리 치환(replace)이다.
      {
        path: "foundations/design-tokens",
        element: <Navigate to="/overview/design-token" replace />,
      },
      {
        path: "foundations/migration-reference",
        element: <Navigate to="/developments/migration" replace />,
      },

      // 아직 문서가 없는 메뉴(Components 전부, Overview의 MDS·Progress Board,
      // Typography Reference)는 여기로 떨어진다.
      { path: "*", element: <NotReadyPage /> },
    ],
  },
]);
