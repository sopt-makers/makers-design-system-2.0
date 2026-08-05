import { createBrowserRouter, Navigate } from "react-router-dom";
import { DocsLayout } from "../layouts/DocsLayout";
import { HomePage } from "../pages/HomePage";
import { NotReadyPage } from "../pages/NotReadyPage";

// Foundations
import DesignTokens from "../content/foundations/design-tokens.mdx";
import ColorSystem from "../content/foundations/color-system.mdx";
import ColorTokenReference from "../content/foundations/color-token-reference.mdx";
import SemanticColor from "../content/foundations/semantic-color.mdx";
import MigrationReference from "../content/foundations/migration-reference.mdx";
import Typography from "../content/foundations/typography.mdx";
import TypographySystem from "../content/foundations/typography-system.mdx";
import Spacing from "../content/foundations/spacing.mdx";
import SpacingSystem from "../content/foundations/spacing-system.mdx";
import SpacingTokenReference from "../content/foundations/spacing-token-reference.mdx";
import RadiusSystem from "../content/foundations/radius-system.mdx";
import RadiusTokenReference from "../content/foundations/radius-token-reference.mdx";
import ToneOfVoice from "../content/foundations/tone-of-voice.mdx";
import WritingPrinciples from "../content/foundations/writing-principles.mdx";
import Language from "../content/foundations/language.mdx";
import Grammar from "../content/foundations/grammar.mdx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DocsLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // Foundations 진입점
      { path: "foundations", element: <Navigate to="/foundations/design-tokens" replace /> },

      // Design Tokens
      { path: "foundations/design-tokens", element: <DesignTokens /> },
      { path: "foundations/color-token-reference", element: <ColorTokenReference /> },

      // Color
      { path: "foundations/color-system", element: <ColorSystem /> },
      { path: "foundations/semantic-color", element: <SemanticColor /> },
      { path: "foundations/migration-reference", element: <MigrationReference /> },

      // Typography
      { path: "foundations/typography", element: <Typography /> },
      { path: "foundations/typography-system", element: <TypographySystem /> },

      // Spacing
      { path: "foundations/spacing", element: <Spacing /> },
      { path: "foundations/spacing-system", element: <SpacingSystem /> },
      { path: "foundations/spacing-token-reference", element: <SpacingTokenReference /> },

      // Radius
      { path: "foundations/radius-system", element: <RadiusSystem /> },
      { path: "foundations/radius-token-reference", element: <RadiusTokenReference /> },
      { path: "foundations/radius-token-reference", element: <RadiusTokenReference /> },

      // Writing
      { path: "foundations/tone-of-voice", element: <ToneOfVoice /> },
      { path: "foundations/writing-principles", element: <WritingPrinciples /> },
      { path: "foundations/language", element: <Language /> },
      { path: "foundations/grammar", element: <Grammar /> },

      // 준비 중
      { path: "*", element: <NotReadyPage /> },
    ],
  },
]);
