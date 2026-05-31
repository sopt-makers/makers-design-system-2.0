import { createBrowserRouter } from "react-router-dom";
import GettingStarted from "../content/getting-started.mdx";
import { DocsLayout } from "../layouts/DocsLayout";
import { HomePage } from "../pages/HomePage";
import { NotReadyPage } from "../pages/NotReadyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DocsLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "getting-started", element: <GettingStarted /> },
      // 아직 페이지가 없는 경로(상단 탭 등)는 준비 중 화면으로
      { path: "*", element: <NotReadyPage /> },
    ],
  },
]);
