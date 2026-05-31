import { createBrowserRouter } from "react-router-dom";
import GettingStarted from "../content/getting-started.mdx";
import { DocsLayout } from "../layouts/DocsLayout";
import { HomePage } from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DocsLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "getting-started", element: <GettingStarted /> },
    ],
  },
]);
