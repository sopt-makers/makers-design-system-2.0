import { createBrowserRouter, Navigate } from "react-router-dom";
import ColorSystem from "../content/foundations/color-system.mdx";
import Grammar from "../content/foundations/grammar.mdx";
import Language from "../content/foundations/language.mdx";
import MigrationReference from "../content/foundations/migration-reference.mdx";
import SemanticColor from "../content/foundations/semantic-color.mdx";
import Spacing from "../content/foundations/spacing.mdx";
import ToneOfVoice from "../content/foundations/tone-of-voice.mdx";
import Typography from "../content/foundations/typography.mdx";
import WritingPrinciples from "../content/foundations/writing-principles.mdx";
import { DocsLayout } from "../layouts/DocsLayout";
import { HomePage } from "../pages/HomePage";
import { NotReadyPage } from "../pages/NotReadyPage";

export const router = createBrowserRouter([
  {
        path: "/",
        element: <DocsLayout />,
        children: [
          { index: true, element: <HomePage /> },
                // Foundations 문서 (사이드바 메뉴와 경로 1:1 대응)
          {
                    path: "foundations/color-system",
                    element: <ColorSystem />,
          },
          {
                    path: "foundations/semantic-color",
                    element: <SemanticColor />,
          },
          {
                    path: "foundations/migration-reference",
                    element: <MigrationReference />,
          },
          { path: "foundations/typography", element: <Typography /> },
          { path: "foundations/spacing", element: <Spacing /> },
          { path: "foundations/tone-of-voice", element: <ToneOfVoice /> },
          {
                    path: "foundations/writing-principles",
                    element: <WritingPrinciples />,
          },
          { path: "foundations/language", element: <Language /> },
          { path: "foundations/grammar", element: <Grammar /> },
                // Foundations 진입점은 첫 문서로
          {
                    path: "foundations",
                    element: <Navigate to="/foundations/color-system" replace />,
          },
                // 아직 페이지가 없는 경로(상단 탭 등)는 준비 중 화면으로
          { path: "*", element: <NotReadyPage /> },
              ],
  },
  ]);
